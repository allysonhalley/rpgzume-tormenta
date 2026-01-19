
import sys

dump_file = r'c:\Users\allys\Dev\rpgzume-tormenta\rpgzumedb_dump.sql'

def main():
    print(f"Scanning {dump_file} for encoding issues...")
    try:
        with open(dump_file, 'r', encoding='utf-16-le') as f:
            for i, line in enumerate(f):
                try:
                    # check if this line is part of the problematic table
                    if "Acerto Cr" in line or "Ataque Desarmado" in line: # Sample known bad lines
                        try:
                            line.encode('cp437')
                        except UnicodeEncodeError as e:
                            print(f"Line {i+1} failed encoding: {e}")
                            print(f"Content: {line[e.start-10:e.end+10]!r}")
                            print("-" * 20)
                except Exception as ex:
                    pass
    except Exception as e:
        print(f"Error opening file: {e}")

if __name__ == "__main__":
    main()
