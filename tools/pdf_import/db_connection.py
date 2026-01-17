import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'rpgzumedb'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD', '123456'),
            port=os.getenv('DB_PORT', '5433')
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        raise e
