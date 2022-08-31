from bs4 import BeautifulSoup
import re

# Grabs the list of options from a select element in HTML
def pull_options_list(source, name):
    soup = BeautifulSoup(source, 'html.parser')
    options = soup.select(f'select[name={name}] > option')
    options_list = []
    for x in options:
        options_list.append(re.sub(r'\n\n[\s]*', '', x.getText()))
    return options_list