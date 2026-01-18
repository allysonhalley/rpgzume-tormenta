
import re

def fix_mojibake(input_file, output_file):
    # List of characters to fix
    chars_to_fix = (
        "áàâãä"
        "éèêë"
        "íìîï"
        "óòôõö"
        "úùûü"
        "ç"
        "ñ"
        "ÁÀÂÃÄ"
        "ÉÈÊË"
        "ÍÌÎÏ"
        "ÓÒÔÕÖ"
        "ÚÙÛÜ"
        "Ç"
        "Ñ"
        "–—"  # dashes
        "“”‘’" # quotes
        "…"   # ellipsis
    )
    
    replacements = {}
    for c in chars_to_fix:
        try:
            # Simulate the corruption: UTF-8 bytes interpreted as CP850
            mojibake = c.encode('utf-8').decode('cp850')
            if mojibake != c:
                replacements[mojibake] = c
        except Exception:
            pass
            
    # Sort by length descending to handle potential overlaps
    sorted_mojibake = sorted(replacements.keys(), key=len, reverse=True)
    
    print(f"Generated {len(replacements)} replacements.")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    with open(output_file, 'w', encoding='utf-8') as f:
        inside_racial_traits = False
        fixed_count = 0
        
        for line in lines:
            if "COPY public.racial_traits" in line or "COPY public.card" in line:
                inside_racial_traits = True
                f.write(line)
                continue
            
            if inside_racial_traits:
                if line.strip() == r"\.":
                    inside_racial_traits = False
                    f.write(line)
                else:
                    original_line = line
                    for bad in sorted_mojibake:
                        if bad in line:
                            line = line.replace(bad, replacements[bad])
                    
                    if line != original_line:
                        fixed_count += 1
                    f.write(line)
            else:
                f.write(line)
                
    print(f"Fixed {fixed_count} lines.")

if __name__ == "__main__":
    fix_mojibake("rpgzumedb_dump.sql", "rpgzumedb_dump.sql")
