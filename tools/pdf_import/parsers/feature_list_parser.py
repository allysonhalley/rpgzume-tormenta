import re

def parse_feature_index(text):
    """
    Parses the "Talentos" table/list (pg 94-96 aprox).
    Structure:
    Two columns usually: Talent Name | Prerequisites
    
    But in raw text extraction, it might look like:
    Acuidade com Arma Des 13...
    
    We want to capture the First Identifier of the line.
    
    Common format in Index:
    Name (maybe some flags) ...
    """
    feature_names = set()
    lines = text.split('\n')
    
    # regex for line start. 
    # Usually strictly uppercase ID or Capitalized Words.
    # Ex: "Acrobacia Audaz", "Acuidade com Arma", "Tiro Certeiro"
    
    ignore_lines = ["Talentos", "Talento", "Pré-requisitos", "Benefício", "Tabela", "Capítulo", "Tormenta"]
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if len(line) < 3: continue
        
        # Check if line starts with header junk
        first_word = line.split()[0]
        if first_word in ignore_lines: continue
        
        # Heuristic: The name is the valid string at the start of the line.
        # It usually stops before a clear Prerequisite (which often contains numbers or attribs) or end of line.
        # But for index, let's just grab the whole first chunk before double spaces?
        # pdfplumber output for tables often puts many spaces between columns.
        
        parts = re.split(r'\s{2,}', line) # Split by 2 or more spaces
        potential_name = parts[0].strip()
        
        # Validate potential name
        # Must start with Uppercase
        if not potential_name: continue
        if not potential_name[0].isupper(): continue
        if any(char.isdigit() for char in potential_name): continue # Ignore lines with numbers in the name part usually
        
        # Filter out common false positives
        if len(potential_name) > 50: continue # unlikely to be just a name
        
        feature_names.add(potential_name.upper())

    return list(feature_names)
