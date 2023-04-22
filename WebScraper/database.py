from dataclasses import dataclass
import psycopg2
from psycopg2.extensions import cursor, connection
from dotenv import load_dotenv
from os import environ
from schema import Schema, SchemaError
import json

@dataclass
class ConnectionInfo:
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str # could also be a string

class Query:
    query_string: str

    def __init__(self):
        self.query_string = ""

    def insert(self, table: str):
        self.query_string = f"INSERT INTO {table}"
        return self

    def columns(self, columns: list[str]):
        cols = " ("
        for i, s in enumerate(columns):
            cols += f"{s}"
            if i == len(columns) - 1:
                cols += ")"
            else:
                cols += ", "

        self.query_string += cols
        return self

    def values(self, values: list[str]):
        '''Add values to your query. String values may need single quotes included!'''
        vals = " VALUES ("
        for i, s in enumerate(values):
            vals += s
            if i == len(values) - 1:
                vals += ")"
            else:
                vals += ", "
        self.query_string += vals
        return self

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
        return self.cur

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

def load_json(fn: str = "outputCleaned.json"):
    with open(fn) as json_file:
        return json.load(json_file)


def insert_to_database(db: DB, quarter: str, cleaned_data={}):
    # needed for escaping apostrophes (cringe)
    bs = "\\"
    ap = "\'"

    season, year = quarter.split(" ")[0], quarter.split(" ")[1]
    
    # generate the Quarter
    quarter_query = f'''INSERT INTO quarters (year, season, date_updated) VALUES ({year}, '{season}', NOW())'''
    db.query(quarter_query)
    db.commit()

    quarter_id: int = db.query(f'''SELECT id FROM quarters
                ORDER BY id DESC''')\
                        .fetchall()[0][0]

    # q = Query()\
    #         .insert("quarters")\
    #         .columns(["year", "season", "date_updated"])\
    #         .values([f"{year}", f"'{season}'", "NOW()"])\
    #         .query_string

    # db.query(q)
    db.commit()

    if cleaned_data == {}:
        # if the data is not provided, check for the cleaned output json
        cleaned_data = load_json()

    for subject_name, courses in cleaned_data.items():
        # create a new subject in the database
        db.query(Query().insert("subjects").columns(["subject_id", "name", "quarter_id"]).values(["gen_random_uuid()", f"'{subject_name}'", f"{quarter_id}"]).query_string)
        db.commit()
        print(subject_name)
        s_id: str = db.query(f'''SELECT subject_id FROM subjects
                             WHERE quarter_id = \'{quarter_id}\' AND name = \'{subject_name.replace(ap, ap + ap)}\'''')\
                                     .fetchall()[0][0]

        for course_name, sections in courses.items():
            # create a new course in the database
            db.query(Query().insert("courses").columns(["course_id", "name", "subject_id"]).values(["gen_random_uuid()", f"'{course_name.replace(f'{ap}', f'{ap}{ap}')}'", f"'{s_id}'"]).query_string)
            db.commit()

            c_id: str = db.query(f'''SELECT course_id FROM courses
                                 WHERE subject_id = \'{s_id}\' AND name = \'{course_name.replace(ap, ap + ap)}\'''')\
                                         .fetchall()[0][0]

            # c_id: str = db
            for section in sections:
                if "callNumber" in section and "sectionTitle" in section\
                        and "creditHours" in section and "activity" in section\
                        and "modality" in section and "days" in section\
                        and "location" in section and "instructor" in section\
                        and "status" in section and "combinedDays" in section\
                        and "combinedLocation" in section\
                        and "combinedTimeStart" in section\
                        and "combinedTimeStop" in section\
                        and "isCombined" in section\
                        and "timeStart" in section\
                        and "timeStop" in section:
                    if section["sectionTitle"] == " ":
                        # if properties are invalid, just skip this section
                        continue
                    db.query(Query()\
                            .insert("sections")\
                            .columns(["section_id",
                                     "course_id",
                                     "call_number",
                                     "section_title",
                                     "credit_hours",
                                     "activity",
                                     "modality",
                                     "days",
                                     "location",
                                     "instructor",
                                     "status",
                                     "combined_days",
                                     "combined_location",
                                     "combined_time_start",
                                     "combined_time_stop",
                                     "is_combined",
                                     "note",
                                     "time_start",
                                     "time_stop"
                                     ])\
                            .values([
                                "gen_random_uuid()",
                                f"'{c_id}'",
                                f"'{section['callNumber']}'",
                                f"'{section['sectionTitle'].replace(ap, ap + ap)}'",
                                f"'{int(float(section['creditHours']))}'",
                                f"'{section['activity'].replace(ap, ap + ap)}'",
                                f"'{section['modality'].replace(ap, ap + ap)}'",
                                f"'{section['days']}'",
                                f"'{section['location']}'",
                                f"'{section['instructor'].replace(ap, ap + ap)}'",
                                f"'{section['status'].replace(ap, ap + ap)}'",
                                f"'{section['combinedDays']}'",
                                f"'{section['combinedLocation']}'",
                                f"'{section['combinedTimeStart']}'",
                                f"'{section['combinedTimeStop']}'",
                                f"'{section['isCombined']}'",
                                f"''", # empty string for now
                                f"'{section['timeStart']}'",
                                f"'{section['timeStop']}'"
                                ]).query_string)
        



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

