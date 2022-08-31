import requests
from bs4 import BeautifulSoup

url = 'https://boss.latech.edu/ia-bin/tsrvweb.cgi?tserve_tip_read_destroy&tserve_tip_write=||WID|SID|PIN|Term|AwdYear|AdTyCode|ConfigName&ConfigName=rcrssect1&ReqNum=1&tserve_trans_config=rcrssect1.cfg&tserve_host_code=HostZero&tserve_tiphost_code=TipZero&dt=1661905508000'
response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')
pageText = soup.text

print(pageText)