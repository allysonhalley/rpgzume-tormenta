
import re

def fix_encoding(input_file, output_file):
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    print(f"Read {len(lines)} lines.")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        inside_racial_traits = False
        fixed_count = 0
        
        for line in lines:
            if "COPY public.racial_traits" in line:
                print(f"Found racial_traits block at line: {line.strip()}")
                inside_racial_traits = True
                f.write(line)
                continue
            
            if inside_racial_traits:
                if line.strip() == r"\.":
                    print("End of racial_traits block.")
                    inside_racial_traits = False
                    f.write(line)
                else:
                    # Apply fix to the line content
                    try:
                        # Debug: print original first few chars
                        # print(f"Original: {line.strip()[:20]}")
                        
                        fixed_line = line.encode('cp850').decode('utf-8')
                        
                        # Debug: print fixed if changed
                        if fixed_line != line:
                            # print(f"Fixed:    {fixed_line.strip()[:20]}")
                            fixed_count += 1
                            
                        f.write(fixed_line)
                    except Exception as e:
                        print(f"Error processing line: {line.strip()[:20]}... {e}")
                        f.write(line)
            else:
                f.write(line)
    print(f"Fixed {fixed_count} lines.")

if __name__ == "__main__":
    fix_encoding("rpgzumedb_dump.sql", "rpgzumedb_dump.sql")
