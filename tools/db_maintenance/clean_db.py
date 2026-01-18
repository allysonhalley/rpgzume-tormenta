from db_connection import get_db_connection

def clean_database():
    conn = get_db_connection()
    if not conn:
        print("Failed to connect to database.")
        return

    try:
        cur = conn.cursor()
        print("Cleaning database tables...")
        # Truncate tables with CASCADE to handle foreign keys
        cur.execute("TRUNCATE TABLE magic, feature, card CASCADE;")
        conn.commit()
        print("Database cleaned successfully!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error cleaning database: {e}")
        if conn:
            conn.rollback()
            conn.close()

if __name__ == "__main__":
    print("Cleaning database tables (auto-confirmed)...")
    clean_database()
