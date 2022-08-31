import requests
from bs4 import BeautifulSoup

# Grabs the list of options from a select element in HTML
def pull_options_list(url):
    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    options = soup.select('select[name=Subject] > option')
    for x in options:
        options_text = x.getText()
    options_list = options_text.replace("\r", "").split("\n")
    clean_options_list = [i for i in options_list if i != '']
    clean_options_list = clean_options_list[:-1]

    return clean_options_list

print(pull_options_list('https://boss.latech.edu/ia-bin/tsrvweb.cgi?tserve_trans_config=rcolcat1hp.cfg&tserve_tip_write=||WID&tserve_host_code=HostZero&tserve_tiphost_code=TipZero'))