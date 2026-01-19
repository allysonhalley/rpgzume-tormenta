
with open('rpgzumedb_dump.sql', 'rb') as f:
    for line in f:
        try:
            decoded = line.decode('utf-8', errors='replace')
            if 'An?es' in decoded or 'Anões' in decoded or 'Anes' in decoded:
                print(f"Original Bytes: {line}")
                print(f"Decoded (replace): {decoded.strip()}")
                break
        except Exception:
            pass
