import re

def parse_magic_index(text):
    """
    Parses the "Lista de Magias" (pg 151-160 aprox) to get a list of valid Magic names.
    Structure often is:
    Level N
    Magic Name (Descriptor) - Brief description.
    Magic Name 2 ...
    """
    magic_names = set()
    lines = text.split('\n')
    
    # Regex to capture the start of a line that looks like a magic entry in the index.
    # Usually: "Nome da Magia (Descritor, opcional). Resumo."
    # We want "Nome da Magia".
    # Heuristic: It's the bold part before the first period or parens? 
    # Or just capture everything before the first period.
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if len(line) < 3: continue
        
        # Ignore headers like "Nível 1", "Magias Arcanas", etc.
        if "Magias" in line and "Nível" in line: continue
        if line.startswith("Nível"): continue
        
        # Heuristic: Split by first period or open paren
        # Many magics in index: "Abençoar Água (água). Cria água benta."
        # Match: starts with word character, extract until ' (' or '.'
        
        match = re.match(r'^([A-ZÀ-Ú][A-Za-zÀ-Úâêîôûãõáéíóúçñ\s\-\’\']+)(\(|[\.\:])', line)
        if match:
            candidate = match.group(1).strip()
            if len(candidate) > 2 and not candidate.lower().startswith("tabela"):
                magic_names.add(candidate.upper()) # normalize to upper for comparison
                
    return list(magic_names)
