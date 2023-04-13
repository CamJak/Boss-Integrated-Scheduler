from dataclasses import dataclass
import psycopg2
from psycopg2.extensions import cursor, connection
from dotenv import load_dotenv
from os import environ
from schema import Schema, SchemaError

@dataclass
class ConnectionInfo:
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str # could also be a string

class DB:
    # instance variables
    conn: connection
    cur: cursor

    # constructor
    def __init__(self, info: ConnectionInfo):
        # create a new connection and assign it to conn variable
        self.conn = psycopg2.connect(
                database=info.DB_NAME,
                user=info.DB_USER,
                password=info.DB_PASS,
                host=info.DB_HOST,
                port=info.DB_PORT
                )

        self.cur = self.conn.cursor()

    def commit(self):
        """Commits changes made by any uncommitted executed SQL queries"""
        self.conn.commit()
    
    def query(self, query: str):
        """Executes a SQL query. Be careful with this."""
        self.cur.execute(query)

    def close_connection(self):
        self.conn.close()

def get_connection_info() -> ConnectionInfo:

    connection_info: ConnectionInfo
    
    # load connection info validating properties along the way
    try:
        connection_info = ConnectionInfo(
                Schema(str).validate(environ.get("PGDATABASE")),
                Schema(str).validate(environ.get("PGUSER")),
                Schema(str).validate(environ.get("PGPASSWORD")),
                Schema(str).validate(environ.get("PGHOST")),
                Schema(str).validate(environ.get("PGPORT"))
                )

    except SchemaError as e:
        # if any of the properties fail to validate, an exception is raised
        #  and the program will exit
        print(e)
        print("It is likely that you've got undefined environment variables!")
        print("Define them in the .env file. Create it if it doesn't exist")
        exit(1)

    return connection_info

def insert_to_database(db: DB, cleaned_data={}):

    print("Made it here!")
    # sleep(5)
    # print(cleaned_data)

    if cleaned_data == {}:
        # if the data is not provided, check for the cleaned output json
        pass

    # at this point, cleaned_data should be defined in some way
    
    # take that cleaned data and create instances of some basic dataclasses
    #  to then easily insert that data into the corresponding tabes in the database




if __name__ == "__main__":

    load_dotenv(".env")
    
    # load connection info validating properties along the way
    connection_info: ConnectionInfo = get_connection_info()
    print(connection_info)

    database = DB(connection_info)
    # insert_to_database(database)

    database.close_connection()

