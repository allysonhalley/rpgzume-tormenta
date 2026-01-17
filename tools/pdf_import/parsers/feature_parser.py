import re

def parse_features_from_text(text, known_names=None):
    """
    Parses text to extract Features (Talentos).
    Uses known_names (list) to accurately identify the start of a feature block.
    """
    features = []
    lines = text.split('\n')
    
    current_feature = {}
    
    # Normalize known names
    known_names_norm = set(n.upper().strip() for n in known_names) if known_names else set()
    
    for i, line in enumerate(lines):
        line = line.strip()
        if not line: continue
        
        # CHECK FOR NEW FEATURE START
        is_new_feature = False
        line_upper = line.upper().strip()
        
        if known_names_norm:
            # Check exact match
            if line_upper in known_names_norm:
                is_new_feature = True
        else:
             # Heuristic Fallback
             # If keyword line, it means previous line was name? No, this legacy logic is weak.
             # Let's assume Uppercase Header line.
             if line.isupper() and len(line) < 100 and "PRÉ-REQUISITO" not in line_upper:
                 is_new_feature = True

        if is_new_feature:
            if current_feature:
                features.append(current_feature)
            current_feature = {'name': line, 'type': 'Geral', 'book': 'Tormenta RPG'}
            continue
            
        # Parse Body
        if current_feature:
            if line.startswith("Pré-requisitos:") or line.startswith("Pré-requisito:"):
                current_feature['prerequisites'] = line.split(':', 1)[1].strip()
            elif line.startswith("Benefício:"):
                current_feature['benefit'] = line.split(':', 1)[1].strip()
            elif line.startswith("Normal:"):
                current_feature['normal'] = line.split(':', 1)[1].strip()
            elif line.startswith("Especial:"):
                current_feature['special'] = line.split(':', 1)[1].strip()
            else:
                # Continuation or Description
                if 'benefit' in current_feature:
                    current_feature['benefit'] += " " + line
                elif 'description' in current_feature:
                    current_feature['description'] += " " + line
                else:
                    current_feature['description'] = line

    if current_feature and 'name' in current_feature:
        features.append(current_feature)
        
    return features
