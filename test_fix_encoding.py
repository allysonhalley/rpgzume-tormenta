
import sys

dump_file = r'c:\Users\allys\Dev\rpgzume-tormenta\rpgzumedb_dump.sql'

print("Testing encoding fix on dump file...")

try:
    with open(dump_file, 'r', encoding='utf-16-le') as f:
        # Scan for the line with "Acerto"
        found = False
        for line in f:
            if "Acerto" in line:
                print(f"Original (UTF-16LE read): {line.strip()[:100]}")
                
                # Try fix
                try:
                    fixed_line = line.encode('cp437').decode('utf-8')
                    print(f"Fixed (cp437 -> utf-8): {fixed_line.strip()[:100]}")
                    if "Crítico" in fixed_line:
                        print("SUCCESS: Recovered 'Crítico'.")
                    else:
                        print("FAIL: Still malformed.")
                except Exception as e:
                    print(f"Fix failed: {e}")
                
                found = True
                break
        
        if not found:
            print("Did not find 'Acerto' in dump.")
            
except Exception as e:
    print(f"Error: {e}")
