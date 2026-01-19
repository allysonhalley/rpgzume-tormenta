
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

try:
    print("Connecting to DB...")
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'rpgzumedb'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', '123456'),
        port=os.getenv('DB_PORT', '5433')
    )
    cur = conn.cursor()
    
    print("Listing tables in public schema:")
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = cur.fetchall()
    for t in tables:
        print(f"- {t[0]}")
        
    print("\nCreating debug_test table...")
    try:
        cur.execute("CREATE TABLE IF NOT EXISTS debug_test (id serial PRIMARY KEY, name text);")
        cur.execute("INSERT INTO debug_test (name) VALUES ('test');")
        conn.commit()
        print("Created and inserted into debug_test.")
    except Exception as e:
        print(f"Error creating/inserting debug_test: {e}")

    try:
        cur.execute("SELECT count(*) FROM card;")
        print(f"Card Count: {cur.fetchone()[0]}")
    except Exception as e:
        print(f"Error checking card: {e}")
        
    try:
        cur.execute("SELECT count(*) FROM class_abilities;")
        print(f"ClassAbilities Count: {cur.fetchone()[0]}")
    except Exception as e:
        print(f"Error checking class_abilities: {e}")
        
    conn.close()
    
except Exception as e:
    print(f"Connection failed: {e}")
