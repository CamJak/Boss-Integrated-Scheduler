from seleniumNavigator import run_scraper
from dataCleaner import clean
from database import insert_to_database, get_connection_info, DB
from dotenv import load_dotenv

# this means it only runs when directly executed by python
if __name__ == "__main__":

    # load environment variables defined in .env file
    load_dotenv(".env")

    database: DB
    

    # load connection info validating properties along the way
    connection_info = get_connection_info()

    database = DB(connection_info)

    scraper_out = run_scraper('Spring 2023', True)
    cleaner_out = clean(scraper_out, True)
    insert_to_database(database, 'Spring 2023', cleaner_out)
    # for if you just wanna skip and insert from json
    # insert_to_database(database, 'Spring 2023')#, cleaner_out)
    database.close_connection()

    if database:
        database.close_connection()
