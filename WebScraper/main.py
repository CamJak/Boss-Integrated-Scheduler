from seleniumNavigator import run_scraper
from dataCleaner import clean

# this means it only runs when directly executed by python
if __name__ == "__main__":
    scraperOut = run_scraper('Fall 2023')
    clean(scraperOut)
