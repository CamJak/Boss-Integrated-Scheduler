from seleniumNavigator import run_scraper
from dataCleaner import clean
from database import insert_to_database

# this means it only runs when directly executed by python
if __name__ == "__main__":
    scraper_out = run_scraper('Spring 2023')
    cleaner_out = clean(scraper_out)
    insert_to_database(cleaner_out)
