import os
import argparse
import sys
import json
import time
import pdfplumber
import google.generativeai as genai
from db_connection import get_db_connection
from dotenv import load_dotenv

# Load .env explicitly from absolute path
dotenv_path = r'c:\Users\allys\Dev\rpgzume-tormenta\.env'
load_dotenv(dotenv_path)

# Configure API
# Expects GOOGLE_API_KEY in environment variables
def configure_genai():
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("Error: GOOGLE_API_KEY environment variable not set.")
        # Optional: prompt user
        api_key = input("Please enter your Google API Key: ").strip()
        if not api_key:
            sys.exit(1)
    genai.configure(api_key=api_key)

def extract_text_from_pdf(pdf_path, start_page, end_page):
    print(f"Extracting text from pages {start_page}-{end_page}...")
    full_text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            # pdf index is 0-based
            s = max(0, start_page - 1)
            e = min(len(pdf.pages), end_page)
            for i in range(s, e):
                page = pdf.pages[i]
                text = page.extract_text()
                if text:
                    full_text += f"\n--- Page {i+1} ---\n{text}"
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None
    return full_text

def parse_with_gemini(text, mode="magic"):
    # Model init moved inside try/catch for better error handling and swapping

    
    if mode == "magic":
        prompt = """
        You are an expert RPG parser. Extract all Spells (Magias) from the following text.
        Return a JSON object with a key "magics" containing a list of objects.
        
        Each object MUST have these fields (translate/map from Portuguese text):
        - name: string (Name of the spell)
        - type: "Arcana" or "Divina" (or "Universal")
        - school: string (e.g. "Ilusão", "Evocação")
        - level: string (e.g. "1", "2", "3")
        - components: string (Componentes)
        - cast_time: string (Tempo de Execução)
        - range: string (Alcance)
        - target_area: string (Alvo, Área ou Efeito)
        - duration: string (Duração)
        - saving_throw: string (Teste de Resistência)
        - spell_resistance: string (Resistência a Magia)
        - description: string (The full descriptive text of the spell, excluding the header fields above)
        
        Ignore headers, footers, and sidebars. 
        If a spell spans multiple pages, combine the text.
        Structure:
        {
          "magics": [ ... ]
        }
        IMPORTANT: Do not return multiple lists. Put all items in one single "magics" list. Ensure valid JSON.
        Escape quotes inside strings properly.
        
        Text to parse:
        """
    elif mode == "racial_traits":
        prompt = """
        You are an expert RPG parser. Extract all Races (Raças) and their traits from the following text.
        Return a JSON object with a key "racial_traits" containing a list of objects.
        
        Each object MUST have these fields:
        - name: string (Name of the race)
        - description: string (The first paragraph found right below the race name)
        - traits: string (A list of racial abilities/traits. Return as a single string with items separated by newlines or semicolons)
        
        Ignore headers, footers.
        Structure:
        {
          "racial_traits": [ ... ]
        }

        Text to parse:
        """
    else: # features
        prompt = """
        You are an expert RPG parser. Extract all Feats (Talentos) from the following text.
        Return a JSON object with a key "features" containing a list of objects.
        
        Each object MUST have these fields:
        - name: string
        - feature_type: string (e.g. "Geral", "Combate", "Destino", inferred from context or list headers if present)
        - prerequisites: string (Pré-requisitos)
        - benefit: string (Benefício)
        - normal: string (Normal)
        - special: string (Especial)
        - description: string (Any other text, or if Benefit/Normal fields are missing, put the text here)

        Ignore headers, footers.
        Structure:
        {
          "features": [ ... ]
        }

        Text to parse:
        """

    try:
        # Debug: list models
        # for m in genai.list_models():
        #     if 'generateContent' in m.supported_generation_methods:
        #         print(m.name)

        # Dynamic Model Selection
        available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        print(f"Available models: {available_models}")
        
        chosen_model_name = None
        # Preference: Flash > Pro > Any
        for m in available_models:
            if 'flash' in m.lower():
                chosen_model_name = m
                break
        if not chosen_model_name:
            for m in available_models:
                if 'pro' in m.lower():
                    chosen_model_name = m
                    break
        if not chosen_model_name and available_models:
            chosen_model_name = available_models[0]
            
        if not chosen_model_name:
            print("No suitable Gemini model found.")
            return []

        print(f"Sending request to Gemini ({len(text)} chars)... using {chosen_model_name}")
        model = genai.GenerativeModel(chosen_model_name) 

        response = model.generate_content(prompt + text, generation_config={"response_mime_type": "application/json"})
        
        print(f"AI Response preview: {response.text[:200]}...")

        # Clean markdown code blocks if present
        cleaned_text = response.text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text[7:]
        if cleaned_text.startswith("```"):
            cleaned_text = cleaned_text[3:]
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text[:-3]
        cleaned_text = cleaned_text.strip()

        # Parse JSON
        try:
             result = json.loads(cleaned_text)
             if mode == 'racial_traits':
                 items = result.get('racial_traits', [])
             else:
                 items = result.get(mode + "s", [])
             print(f"Parsed {len(items)} items from JSON.")
             return items
        except json.JSONDecodeError:
            print("Failed to decode JSON from AI response. Raw text:")
            print(response.text)
            return []
            
    except Exception as e:
        print(f"AI Error: {e}")
        return []

def insert_magics(magics):
    conn = get_db_connection()
    if not conn: return
    
    cur = conn.cursor()
    count = 0
    print(f"Inserting {len(magics)} magics...")
    
    for m in magics:
        try:
            # Create Card
            name = m.get('name', 'Unknown')
            desc = m.get('description', '')
            resume = desc[:200] + "..." if len(desc) > 200 else desc
            
            cur.execute("""
                INSERT INTO card (type, name, resume, description, book, page)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, ('magic', name, resume, desc, 'Tormenta RPG', 0))
            card_id = cur.fetchone()[0]
            
            # Create Magic
            cur.execute("""
                INSERT INTO magic (
                    card_id, type, school, level, components, cast_time, range, 
                    target_area, duration, saving_throw, spell_resistance, effect
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                card_id, m.get('type'), m.get('school'), m.get('level'), 
                m.get('components'), m.get('cast_time'), m.get('range'),
                m.get('target_area'), m.get('duration'), m.get('saving_throw'),
                m.get('spell_resistance'), '' # Effect often mixed with target/area
            ))
            conn.commit()
            count += 1
        except Exception as e:
            conn.rollback()
            print(f"Error inserting magic {m.get('name')}: {e}")
            
    print(f"Inserted {count} magics.")
    cur.close()
    conn.close()

def insert_features(features):
    conn = get_db_connection()
    if not conn: return
    
    cur = conn.cursor()
    count = 0
    print(f"Inserting {len(features)} features...")
    
    for f in features:
        try:
            # Create Card
            name = f.get('name', 'Unknown')
            desc = f.get('description', '') or f.get('benefit', '')
            resume = desc[:200] + "..." if len(desc) > 200 else desc
            
            cur.execute("""
                INSERT INTO card (type, name, resume, description, book, page)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, ('feature', name, resume, desc, 'Tormenta RPG', 0))
            card_id = cur.fetchone()[0]
            
            # Create Feature
            # Map feature_type to DB column
            f_type = f.get('feature_type', 'Geral')
            
            cur.execute("""
                INSERT INTO feature (
                    card_id, feature_type, prerequisites, benefit, normal, special
                ) VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                card_id, f_type, f.get('prerequisites'), f.get('benefit'), 
                f.get('normal'), f.get('special')
            ))
            conn.commit()
            count += 1
        except Exception as e:
            conn.rollback()
            print(f"Error inserting feature {f.get('name')}: {e}")
            
    print(f"Inserted {count} features.")
    cur.close()
    conn.close()

def insert_racial_traits(items):
    conn = get_db_connection()
    if not conn: return
    
    cur = conn.cursor()
    count = 0
    print(f"Inserting {len(items)} racial traits...")
    
    for r in items:
        try:
            # Create Card
            name = r.get('name', 'Unknown')
            desc = r.get('description', '')
            resume = "" # Requested to be null, but DB requires NOT NULL. Using empty string.
            
            cur.execute("""
                INSERT INTO card (type, name, resume, description, book, page)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, ('racial_traits', name, resume, desc, 'Tormenta RPG', 0))
            card_id = cur.fetchone()[0]
            
            # Create RacialTraits
            cur.execute("""
                INSERT INTO racial_traits (card_id, traits)
                VALUES (%s, %s);
            """, (card_id, r.get('traits', '')))
            
            conn.commit()
            count += 1
        except Exception as e:
            conn.rollback()
            print(f"Error inserting race {r.get('name')}: {e}")
            
    print(f"Inserted {count} races.")
    cur.close()
    conn.close()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf_path")
    parser.add_argument("--mode", choices=['magic', 'feature', 'racial_traits'], required=True)
    parser.add_argument("--start", type=int, required=True)
    parser.add_argument("--end", type=int, required=True)
    parser.add_argument("--chunk_size", type=int, default=10, help="Pages per AI request")
    args = parser.parse_args()
    
    configure_genai()
    
    # Calculate chunks
    total_pages = args.end - args.start + 1
    current_start = args.start
    
    print(f"Starting batch import from {args.start} to {args.end} (Chunk size: {args.chunk_size})")
    
    while current_start <= args.end:
        current_end = min(current_start + args.chunk_size - 1, args.end)
        
        print(f"\n--- Processing Chunk: Pages {current_start}-{current_end} ---")
        
        text = extract_text_from_pdf(args.pdf_path, current_start, current_end)
        if not text:
            print("No text extracted for this chunk.")
            current_start += args.chunk_size
            continue

        print(f"Parsing {args.mode}s with Gemini...")
        data = parse_with_gemini(text, mode=args.mode)
        
        if data:
            if args.mode == 'magic':
                insert_magics(data)
            elif args.mode == 'feature':
                insert_features(data)
            else:
                insert_racial_traits(data)
        else:
            print("No data parsed for this chunk.")
            
        current_start += args.chunk_size
        # Optional sleep to be nice to API
        time.sleep(2)

if __name__ == "__main__":
    main()
