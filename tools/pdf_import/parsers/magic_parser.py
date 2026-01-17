import re

def parse_magics_from_text(text, known_names=None):
    """
    Parses full description text. 
    If known_names (list of strings) is provided, it uses it to strictly identify start of Magics.
    """
    magics = []
    lines = text.split('\n')
    current_magic = {}
    
    # Normalize known names for matching
    known_names_norm = set(n.upper().strip() for n in known_names) if known_names else set()
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        # CHECK FOR NEW MAGIC START
        # If we have a known list, strictly check if line is in it.
        # Else use heuristic (Uppercase line)
        
        is_new_magic = False
        line_upper = line.upper().strip()
        
        if known_names_norm:
            # Check exact match or match with slight suffix
            if line_upper in known_names_norm:
                is_new_magic = True
        else:
             # Heuristic fallback (weak)
             if line.isupper() and len(line) < 50:
                 is_new_magic = True

        if is_new_magic:
            # Save previous
            if current_magic:
                magics.append(current_magic)
            current_magic = {'name': line} # Use the line as it appears in text (preserving case if any)
            continue

        # If not start of magic, parse attributes
        if not current_magic:
            continue
            
        # Parse attributes (School, Level, keywords)
        # Capture "School Level" line e.g. "Arcana 1 (Ilusão)"
        school_match = re.search(r'^(Arcana|Divina|Universal|Abjuração|Adivinhação|Convocação|Encantamento|Evocação|Ilusão|Necromancia|Transmutação)\s+(\d+|truque)', line, re.IGNORECASE)
        if school_match:
            current_magic['school'] = school_match.group(1)
            current_magic['level'] = school_match.group(2)
            if 'Arcana' in line or 'Universal' in line:
                current_magic['type'] = 'Arcana'
            elif 'Divina' in line:
                current_magic['type'] = 'Divina'
            continue
            
        if line.startswith("Execução:"):
            current_magic['cast_time'] = line.replace("Execução:", "").strip()
        elif line.startswith("Alcance:"):
            current_magic['range'] = line.replace("Alcance:", "").strip()
        elif line.startswith("Alvo:"):
            current_magic['target_area'] = line.replace("Alvo:", "").strip()
        elif line.startswith("Área:"):
            current_magic['target_area'] = line.replace("Área:", "").strip()
        elif line.startswith("Efeito:"):
            current_magic['effect'] = line.replace("Efeito:", "").strip()
        elif line.startswith("Duração:"):
            current_magic['duration'] = line.replace("Duração:", "").strip()
        elif line.startswith("Teste de Resistência:"):
            current_magic['saving_throw'] = line.replace("Teste de Resistência:", "").strip()
        elif line.startswith("Resistência a Magia:"):
            current_magic['spell_resistance'] = line.replace("Resistência a Magia:", "").strip()
        elif line.startswith("Componentes:"):
            current_magic['components'] = line.replace("Componentes:", "").strip()
        else:
            # Description accumulator
            # Avoid appending if it looks like a header/footer or page number
            if line.isdigit(): continue
            
            if 'description' in current_magic:
                current_magic['description'] += " " + line
            else:
                 current_magic['description'] = line
        
    if current_magic:
        magics.append(current_magic)
        
    return magics
