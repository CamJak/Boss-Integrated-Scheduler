from seleniumNavigator import run_scraper
from dataCleaner import clean
from database import insert_to_database, get_connection_info, DB
from dotenv import load_dotenv
from sys import argv
from pprint import pprint
from datetime import date

# this means it only runs when directly executed by python
if __name__ == "__main__":

    if len(argv) != 3:
        print("ERR: Invalid Arguments")
        print(f"Usage python(3) {argv[0]} [Season] [Year]")
        print(f"e.g. python(3) {argv[0]} Summer 2023")
        exit(1)

    validSeasons = ["Winter", "Spring", "Summer", "Fall"]

    if argv[1] not in validSeasons:
        print(f"{argv[1]} is not a valid season")
        print("Valid seasons:")
        pprint(validSeasons)
        exit(1)

    if not int(argv[2]) <= date.today().year + 1 or not int(argv[2]) >= date.today().year - 1:
        print(f"{argv[2]} is not a valid year (certainly not in BOSS)")
        exit(1)

    # load environment variables defined in .env file
    load_dotenv(".env")

    database: DB

    # quarter = "Fall 2023"
    # quarter = "Summer 2023"
    quarter = f"{argv[1]} {argv[2]}"
    

    # load connection info validating properties along the way
    connection_info = get_connection_info()

    database = DB(connection_info)

    scraper_out = run_scraper(quarter, True)
    cleaner_out = clean(scraper_out, True)
    insert_to_database(database, quarter, cleaner_out)
    # for if you just wanna skip and insert from json
    # insert_to_database(database, 'Spring 2023')#, cleaner_out)
    database.close_connection()

    if database:
        database.close_connection()
