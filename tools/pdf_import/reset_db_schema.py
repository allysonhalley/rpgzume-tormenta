from db_connection import get_db_connection

def reset_schema():
    conn = get_db_connection()
    if not conn:
        print("Failed to connect.")
        return

    try:
        cur = conn.cursor()
        print("Dropping tables to force schema update...")
        # Drop application tables
        cur.execute("DROP TABLE IF EXISTS magic, feature, card CASCADE;")
        
        # Drop flyway history so it re-runs migrations
        cur.execute("DROP TABLE IF EXISTS flyway_schema_history CASCADE;")
        
        conn.commit()
        print("Tables dropped. Restart the Backend (Spring Boot) to recreate them with new schema!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error resetting schema: {e}")
        if conn:
            conn.rollback()
            conn.close()

if __name__ == "__main__":
    # confirm = input("This will DROP all tables and Flyway history. Do this only if you want to rebuild schema. Are you sure? (y/n): ")
    # if confirm.lower() == 'y':
    print("Forcing reset...")
    reset_schema()
