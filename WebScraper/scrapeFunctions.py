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
    soup = BeautifulSoup(source, 'html.parser')
    table = soup.find_all("tr")
    for row in table[1:]:
        if ((count > 3) and (len(row.find_all("td")) > 3)):
            td_tags = row.find_all("td")
            td_list = []
            for tag in td_tags:
                td_list.append(re.sub('\xa0', '', tag.getText()))
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
            data_list.append(asdict(new_section))
        count += 1

    return data_list
