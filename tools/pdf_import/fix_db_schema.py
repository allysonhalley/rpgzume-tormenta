from db_connection import get_db_connection

def fix_schema():
    conn = get_db_connection()
    if not conn:
        print("Failed to connect.")
        return

    commands = [
        # Feature Table
        "ALTER TABLE feature ALTER COLUMN feature_type TYPE TEXT;",
        "ALTER TABLE feature ALTER COLUMN prerequisites TYPE TEXT;",
        "ALTER TABLE feature ALTER COLUMN benefit TYPE TEXT;",
        "ALTER TABLE feature ALTER COLUMN normal TYPE TEXT;",
        "ALTER TABLE feature ALTER COLUMN special TYPE TEXT;",
        
        # Card Table
        "ALTER TABLE card ALTER COLUMN resume TYPE TEXT;",
        "ALTER TABLE card ALTER COLUMN name TYPE TEXT;",
        "ALTER TABLE card ALTER COLUMN book TYPE TEXT;",
        "ALTER TABLE card ALTER COLUMN description TYPE TEXT;",
        
        # Magic Table
        "ALTER TABLE magic ALTER COLUMN components TYPE TEXT;",
        "ALTER TABLE magic ALTER COLUMN cast_time TYPE TEXT;",
        "ALTER TABLE magic ALTER COLUMN range TYPE TEXT;",
        "ALTER TABLE magic ALTER COLUMN target_area TYPE TEXT;",
        "ALTER TABLE magic ALTER COLUMN duration TYPE TEXT;",
        "ALTER TABLE magic ALTER COLUMN saving_throw TYPE TEXT;",
        "ALTER TABLE magic ALTER COLUMN spell_resistance TYPE TEXT;",
        "ALTER TABLE magic ALTER COLUMN effect TYPE TEXT;"
    ]

    try:
        cur = conn.cursor()
        print("Forcing schema columns to TEXT...")
        for cmd in commands:
            try:
                cur.execute(cmd)
            except Exception as e:
                # Ignore if column doesn't exist or other minor error, keep trying others
                print(f"Warning executing '{cmd}': {e}")
                conn.rollback() # Rollback the single failed statement
                continue
            conn.commit()
            
        print("Schema fixed! specific columns are now TEXT.")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error fixing schema: {e}")

if __name__ == "__main__":
    fix_schema()
