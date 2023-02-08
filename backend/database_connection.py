import psycopg2
import time
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_RETRIES = 5

def connect_to_database():
    for i in range(DATABASE_RETRIES):
        try:
            conn = psycopg2.connect(
                host=os.getenv('DB_HOST'),
                database=os.getenv('DB_NAME'),
                user=os.getenv('DB_USER'),
                password=os.getenv('DB_PASSWORD'),
            )
            return conn
        except psycopg2.OperationalError as e:
            if i == DATABASE_RETRIES - 1:
                raise e
            time.sleep(1)

conn = connect_to_database()