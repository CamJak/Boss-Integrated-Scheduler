## Functions needed for scraping process ##

from bs4 import BeautifulSoup
from models import sectionData
import re
from dataclasses import asdict

# Grabs the list of options from a select element in HTML
def pull_options_list(source, name):
    soup = BeautifulSoup(source, 'html.parser')
    options = soup.select(f'select[name={name}] > option')
    options_list = []
    for x in options:
        options_list.append(re.sub(r'\n\n[\s]*', '', x.getText()))
    return options_list

# Grabs all sections in a given course and returns them as a list of objects
def get_section_data(source):
    data_list = []
    count = 0
    combined = False
    # parses html into a soup object
    soup = BeautifulSoup(source, 'html.parser')
    # grabs all rows in the html table
    table = soup.find_all("tr")
    # iterates through each row
    for row in table[1:]:
        # skips the first 3 rows
        if ((count > 3) and (len(row.find_all("td")) > 3)):
            # grabs all the data from the row
            td_tags = row.find_all("td")
            td_list = []
            # iterates through each data point and cleans it up
            for tag in td_tags:
                td_list.append(re.sub('\xa0', '', tag.getText()))
            # if the previous row was a combined lab and lecture, add lab data to previous row
            if combined:
                new_section.isComplex = True
                new_section.daysTimeLocation2 = re.sub(r'\n[\s]*', ' ', td_list[5])
                # resets combined flag
                combined = False
                # add completed section to list
                data_list.append(asdict(new_section))
                # move to next row
                count += 1
                continue
            # checks if there is a combined lab and lecture
            if 'Combined' in td_list[3]:
                # if there is, set combined flag to true
                combined = True
            # creates a new section object and adds it to the list
            new_section = sectionData(
                re.sub(r'\n[\s]*', ' ', td_list[0]), 
                td_list[1], 
                td_list[2], 
                td_list[3], 
                td_list[4], 
                re.sub(r'\n[\s]*', ' ', td_list[5]), 
                re.sub('WWW', '', td_list[6]), 
                td_list[8]
            )
            if not combined:
                data_list.append(asdict(new_section))
        # move to next row
        count += 1

    return data_list
