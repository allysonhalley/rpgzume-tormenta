import argparse
import sys
import pdfplumber
from parsers.feature_parser import parse_features_from_text
from parsers.magic_parser import parse_magics_from_text
from parsers.magic_list_parser import parse_magic_index
from parsers.feature_list_parser import parse_feature_index
from db_connection import get_db_connection



def extract_text_from_pdf(pdf_path, start_page=None, end_page=None):
    print(f"Extracting text from {pdf_path} (Pages {start_page}-{end_page})...")
    full_text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            pages_to_extract = pdf.pages
            if start_page and end_page:
                 s = max(0, start_page - 1)
                 e = min(len(pdf.pages), end_page)
                 pages_to_extract = pdf.pages[s:e]
            
            for page in pages_to_extract:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"
    except Exception as e:
        print(f"Error reading PDF: {e}")
        sys.exit(1)
    return full_text

def main():
    parser = argparse.ArgumentParser(description="Import Tormenta RPG data from PDF to Database")
    parser.add_argument("pdf_path", help="Path to the PDF file")
    args = parser.parse_args()
    
    # 0. ENSURE SCHEMA (Skipped as per user request to rely on migrations)
    # conn = get_db_connection()
    # if conn:
    #     ensure_schema_is_text(conn)
    #     conn.close()

    # --- 1. PRE-SCAN INDICES ---
    
    # Scan Feature Index (pg 94-96)
    print("Scanning Feature Index (pg 94-96)...")
    feature_index_text = extract_text_from_pdf(args.pdf_path, start_page=94, end_page=96)
    known_feature_names = parse_feature_index(feature_index_text)
    print(f"Index found {len(known_feature_names)} feature names.")
    
    # Scan Magic Index (pg 151-160)
    print("Scanning Magic Index (pg 151-160)...")
    magic_index_text = extract_text_from_pdf(args.pdf_path, start_page=151, end_page=160)
    known_magic_names = parse_magic_index(magic_index_text)
    print(f"Index found {len(known_magic_names)} magic names.")

    # --- 2. EXTRACT CONTENT ---
    
    print("Extracting Features text (pg 97-114)...")
    features_text = extract_text_from_pdf(args.pdf_path, start_page=97, end_page=114)
    
    print("Extracting Magics text (pg 161-221)...")
    magics_text = extract_text_from_pdf(args.pdf_path, start_page=161, end_page=221)

    # --- 3. PARSE ---
    
    print("Parsing features with index guidance...")
    features = parse_features_from_text(features_text, known_names=known_feature_names)
    print(f"Found {len(features)} features.")

    print("Parsing magics with index guidance...")
    magics = parse_magics_from_text(magics_text, known_names=known_magic_names)
    print(f"Found {len(magics)} magics.")

    # 3. Database Insertion
    conn = get_db_connection()
    if not conn:
        print("Failed to connect to database. Skipping insertion.")
        return

    try:
        cur = conn.cursor()
        
        # Insert Features
        print(f"Inserting {len(features)} features...")
        for feat in features:
            if not feat.get('name'): continue
            
            # Truncate fields to fit DB limits (VARCHAR 255) -> Updated to allow longer if DB is fixed
            # But let's keep truncating specific small fields just in case, but rely on TEXT for descriptions
            name = (feat.get('name', '')[:250]) # Names shouldn't be pages long anyway
            book = (feat.get('book', 'Unknown')[:200])
            prereq = (feat.get('prerequisites', '')) # Unlimited
            feat_type = (feat.get('type', 'Geral')[:200])
            resume = (feat.get('description', '')[:300] + '...')

            try:
                # Create Card
                cur.execute("""
                    INSERT INTO card (type, name, resume, description, book, page)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                """, ('feature', name, resume, feat.get('description', ''), book, 0))
                card_id = cur.fetchone()[0]
                
                # Create Feature
                cur.execute("""
                    INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special)
                    VALUES (%s, %s, %s, %s, %s, %s);
                """, (card_id, feat_type, prereq, feat.get('benefit'), feat.get('normal'), feat.get('special')))
                
                conn.commit() # Commit individually to isolate errors
                
            except Exception as item_error:
                conn.rollback() # Rollback only this transaction so next items can try
                print(f"Failed to insert feature '{name}': {item_error}")
                continue
            
        # Insert Magics
        print(f"Inserting {len(magics)} magics...")
        for mag in magics:
            if not mag.get('name'): continue
            
            try:
                # Create Card
                cur.execute("""
                    INSERT INTO card (type, name, resume, description, book, page)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                """, ('magic', mag.get('name'), mag.get('description', '')[:300] + '...', mag.get('description', ''), mag.get('book', 'Unknown'), 0))
                card_id = cur.fetchone()[0]
                
                # Create Magic
                cur.execute("""
                    INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                """, (card_id, mag.get('type'), mag.get('school'), mag.get('level'), mag.get('components'), mag.get('cast_time'), 
                      mag.get('range'), mag.get('target_area'), mag.get('duration'), mag.get('saving_throw'), mag.get('spell_resistance'), mag.get('effect')))
                
                conn.commit() # Commit individually
            except Exception as magic_error:
                conn.rollback()
                print(f"Failed to insert magic '{mag.get('name')}': {magic_error}")
                continue

        print("Insertion complete!")
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Error during insertion: {e}")
        if conn:
            conn.rollback()
            conn.close()

if __name__ == "__main__":
    main()
