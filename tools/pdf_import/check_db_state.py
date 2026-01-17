from db_connection import get_db_connection

def check_schema():
    conn = get_db_connection()
    if not conn:
        print("Failed to connect.")
        return

    try:
        cur = conn.cursor()
        print("Checking column types in database...")
        
        tables = ['card', 'feature', 'magic']
        for table in tables:
            print(f"\n--- TABLE: {table} ---")
            query = """
                SELECT column_name, data_type, character_maximum_length 
                FROM information_schema.columns 
                WHERE table_name = %s;
            """
            cur.execute(query, (table,))
            rows = cur.fetchall()
            if not rows:
                print("Table not found!")
            for row in rows:
                col, dtype, max_len = row
                print(f"  {col}: {dtype} ({max_len if max_len else 'unlimited'})")
        
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error checking schema: {e}")

if __name__ == "__main__":
    check_schema()
