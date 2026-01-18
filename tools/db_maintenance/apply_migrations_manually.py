import os
from db_connection import get_db_connection

def apply_migrations():
    conn = get_db_connection()
    if not conn:
        print("Failed to connect.")
        return

    # Paths relative to this script
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../..", "backend", "src", "main", "resources", "db", "migration"))
    
    files = [
        "V20241129003205__create_table_card.sql",
        "V20241129003217__create_table_feature.sql",
        "V20241129230213__create_table_magic.sql"
    ]

    try:
        cur = conn.cursor()
        print("Applying migrations manually...")
        
        for fname in files:
            fpath = os.path.join(base_path, fname)
            print(f"Executing {fname}...")
            with open(fpath, "r", encoding="utf-8") as f:
                sql = f.read()
                cur.execute(sql)
        
        conn.commit()
        print("Migrations applied successfully!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error applying migrations: {e}")
        if conn:
            conn.rollback()
            conn.close()

if __name__ == "__main__":
    apply_migrations()
