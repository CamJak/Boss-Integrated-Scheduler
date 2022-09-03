from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
#from pandas import DataFrame
import json
import scrapeFunctions as scrape
from classes import sectionData

# set up chrome webdriver
options = Options()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)
driver.implicitly_wait(0.1)

# set debug variable
DEBUG = True

# set url for main page
main_url = "https://boss.latech.edu/ia-bin/tsrvweb.cgi?&WID=W&tserve_tip_write=||WID&ConfigName=rcrssecthp1&ReqNum=1&TransactionSource=H&tserve_trans_config=rcrssecthp1.cfg&tserve_host_code=HostZero&tserve_tiphost_code=TipZero"
driver.get(main_url)
driver.find_element('xpath', "//input[ @type='submit' ]").click()

# create object to store collected data
all_data = {}

# grab list of all subjects
all_subjects = scrape.pull_options_list(driver.page_source, "Subject")
if DEBUG:
    print("------Begin Scrape!------")
for subject in all_subjects:
    current_subject = {}
    if DEBUG:
        print(f"Beginning work on subject: {subject}")
    # navigate to tab of current subject
    xpath = f"//option[ contains (text(), \"{subject}\" ) ]"
    driver.find_element('xpath', xpath).click()
    driver.find_element('xpath', "//input[ @type='submit' ]").click()
    # grab list of courses within each subject
    current_courses = scrape.pull_options_list(driver.page_source, "CourseID")
    # iterate through courses
    for course in current_courses:
        current_course = []
        if DEBUG:
            print(f"Beginning work on course: {course}")
        # navigate to tab of current course
        xpath = f"//option[ contains (text(), \"{course}\" ) ]"
        driver.find_element('xpath', xpath).click()
        driver.find_element('xpath', "//input[ @type='submit' ]").click()
        # grab classes from course using scrape
        #!TODO make this not a fake append
        current_class = scrape.get_class_data(driver.page_source)
        current_course.append(current_class)
        # go back a tab
        driver.find_element('xpath', "//a[contains(text(), 'Select Another Course')]").click()
        # add new course to current subject
        current_subject[f"{course}"] = current_course
    # add new subject to all_data
    all_data[f"{subject}"] = current_subject
    # go back to main tab
    driver.get(main_url)
    driver.find_element('xpath', "//input[ @type='submit' ]").click()

# output as json
json_out = json.dumps(all_data, indent=2)
print(json_out)
