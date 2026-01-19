
import sys

# Windows console might not default to utf-8, but python 3.7+ usually works well.
# explicitly trying to print the chars.

file_path = r'c:\Users\allys\Dev\rpgzume-tormenta\backend\src\main\resources\db\migration\V2__import_data.sql'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        print(f"Reading {file_path} with utf-8 encoding...")
        content = f.read(2000) # Read first 2000 chars
        
        # Look for a known string that should have special chars
        # "Acerto Crítico Aprimorado"
        if "Acerto Crítico Aprimorado" in content:
            print("SUCCESS: Found 'Acerto Crítico Aprimorado' correctly.")
        else:
            print("WARNING: Did not find 'Acerto Crítico Aprimorado'. Checking for mojibake...")
            if "Acerto Cr├¡tico Aprimorado" in content:
                 print("FOUND MOJIBAKE: 'Acerto Cr├¡tico Aprimorado' (UTF-8 bytes read as Latin-1?)")
            else:
                 print("Could not find expected string. Content snapshot:")
                 print(content[:200])

except Exception as e:
    print(f"Error reading file: {e}")
