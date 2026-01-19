
import sys
import re

dump_file = r'c:\Users\allys\Dev\rpgzume-tormenta\rpgzumedb_dump.sql'
output_file = r'c:\Users\allys\Dev\rpgzume-tormenta\migrated_data.sql'

def parse_copy_block(f_handle, column_names):
    data = []
    for line_orig in f_handle:
        # Fix encoding corruption: CP437 bytes interpreted as Unicode in UTF-16LE file
        try:
            line = line_orig.encode('cp850').decode('utf-8')
        except:
            line = line_orig

        if line.strip() == '\.':
            break
        parts = line.split('\t')
        row = {}
        for i, col in enumerate(column_names):
            val = parts[i].strip() if i < len(parts) else "\\N"
            if val == "\\N":
                row[col] = None
            else:
                row[col] = val
        data.append(row)
    return data

def main():
    cards = {} # id -> card_row
    features = []
    magics = []
    racial_traits = []
    class_abilities_list = []
    
    tables_to_parse = {
        'public.card': ['id', 'type', 'name', 'resume', 'description', 'book', 'page'],
        'public.feature': ['id', 'card_id', 'feature_type', 'prerequisites', 'benefit', 'normal', 'special'],
        'public.magic': ['id', 'card_id', 'magic_type', 'school', 'level', 'components', 'cast_time', 'range', 'target_area', 'duration', 'saving_throw', 'spell_resistance', 'effect'],
        'public.racial_traits': ['id', 'card_id', 'traits'],
        'public.class_abilities': ['id', 'card_id', 'abilities']
    }

    print("Reading dump file...")
    try:
        with open(dump_file, 'r', encoding='utf-16-le') as f:
            for line in f:
                if line.startswith("COPY "):
                    match = re.match(r"COPY ([\w\.]+) \((.*)\) FROM stdin;", line)
                    if match:
                        table_name = match.group(1)
                        cols = [c.strip() for c in match.group(2).split(',')]
                        
                        if table_name in tables_to_parse:
                            print(f"Parsing {table_name}...")
                            rows = parse_copy_block(f, cols)
                            if table_name == 'public.card':
                                for r in rows: cards[r['id']] = r
                            elif table_name == 'public.feature':
                                features = rows
                            elif table_name == 'public.magic':
                                magics = rows
                            elif table_name == 'public.racial_traits':
                                racial_traits = rows
                            elif table_name == 'public.class_abilities':
                                class_abilities_list = rows
    except Exception as e:
        print(f"Error reading dump: {e}")
        return

    print(f"Loaded {len(cards)} cards.")
    print(f"Loaded {len(features)} features.")
    print(f"Loaded {len(magics)} magics.")
    
    with open(output_file, 'w', encoding='utf-8') as out:
        out.write("-- Data Migration Script (Fixed Encoding)\n")
        
        def sql_val(v):
            if v is None: return "NULL"
            return "'" + v.replace("'", "''") + "'"

        for f in features:
            cid = f['card_id']
            if cid in cards:
                c = cards[cid]
                sql = f"INSERT INTO public.feature (id, name, resume, description, book, page, type, feature_type, prerequisites, benefit, normal, special) VALUES ({sql_val(c['id'])}, {sql_val(c['name'])}, {sql_val(c['resume'])}, {sql_val(c['description'])}, {sql_val(c['book'])}, {c['page'] or 'NULL'}, {sql_val(c['type'])}, {sql_val(f['feature_type'])}, {sql_val(f['prerequisites'])}, {sql_val(f['benefit'])}, {sql_val(f['normal'])}, {sql_val(f['special'])});\n"
                out.write(sql)
        
        for m in magics:
            cid = m['card_id']
            if cid in cards:
                c = cards[cid]
                sql = f"INSERT INTO public.magic (id, name, resume, description, book, page, type, magic_type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES ({sql_val(c['id'])}, {sql_val(c['name'])}, {sql_val(c['resume'])}, {sql_val(c['description'])}, {sql_val(c['book'])}, {c['page'] or 'NULL'}, {sql_val(c['type'])}, {sql_val(m['magic_type'])}, {sql_val(m['school'])}, {sql_val(m['level'])}, {sql_val(m['components'])}, {sql_val(m['cast_time'])}, {sql_val(m['range'])}, {sql_val(m['target_area'])}, {sql_val(m['duration'])}, {sql_val(m['saving_throw'])}, {sql_val(m['spell_resistance'])}, {sql_val(m['effect'])});\n"
                out.write(sql)

        for rt in racial_traits:
            cid = rt['card_id']
            if cid in cards:
                c = cards[cid]
                sql = f"INSERT INTO public.racial_traits (id, name, resume, description, book, page, type, traits) VALUES ({sql_val(c['id'])}, {sql_val(c['name'])}, {sql_val(c['resume'])}, {sql_val(c['description'])}, {sql_val(c['book'])}, {c['page'] or 'NULL'}, {sql_val(c['type'])}, {sql_val(rt['traits'])});\n"
                out.write(sql)

        # Group Class Abilities by Class Name
        unique_classes = {} # ClassName -> UUID
        import uuid
        
        # Helper to generate consistent UUID based on name
        def get_uuid(name):
            return str(uuid.uuid5(uuid.NAMESPACE_DNS, name))

        for ca in class_abilities_list:
            cid = ca['card_id']
            if cid in cards:
                c = cards[cid]
                class_name = c['name']
                
                # Ensure unique PlayerClass
                if class_name not in unique_classes:
                    pc_id = get_uuid(class_name) 
                    unique_classes[class_name] = pc_id
                    # We don't have specific Class description/resume in this dump structure, so we use placeholders
                    # User request: PlayerClass: name=nome, resume=resumo(pg45), type='base_class'
                    sql_pc = f"INSERT INTO public.player_class (id, name, resume, description, book, page, type) VALUES ({sql_val(pc_id)}, {sql_val(class_name)}, 'Classe Base do Tormenta RPG', 'Descrição da classe disponível no livro.', {sql_val(c['book'])}, {c['page'] or 'NULL'}, 'base_class') ON CONFLICT (id) DO NOTHING;\n"
                    out.write(sql_pc)
                
                pc_id = unique_classes[class_name]
                
                # ClassAbility (extends Card)
                # User request: ClassAbility: name=AbilityName(was resume), resume=NULL, description=Text(was abilities), player_class_id=pc_id
                ability_name = c['resume']
                ability_desc = ca['abilities']
                
                # We use the original card ID for the ClassAbility entity
                sql_ca = f"INSERT INTO public.class_abilities (id, name, resume, description, book, page, type, player_class_id) VALUES ({sql_val(c['id'])}, {sql_val(ability_name)}, NULL, {sql_val(ability_desc)}, {sql_val(c['book'])}, {c['page'] or 'NULL'}, NULL, {sql_val(pc_id)});\n"
                out.write(sql_ca)

    print("Migration script generated: migrated_data.sql")

if __name__ == "__main__":
    main()
