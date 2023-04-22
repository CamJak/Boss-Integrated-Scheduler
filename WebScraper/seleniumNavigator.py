## Main scraper for the boss integrated scheduler ##

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import scrapeFunctions as scrape
import json
import sys
import time


# select term
def select_term(driver, term):
    driver.find_element('xpath', "//option[ contains(text(), '{}' )]".format(term)).click()
    driver.find_element('xpath', "//input[ @type='submit' ]").click()


# main scraper function
def run_scraper(term, output_to_json: bool = False, num_fails: int = 0):

    # def max_fails
    MAX_FAILS = 5

    # set up chrome webdriver
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    driver.implicitly_wait(0.1)

    # set debug variable
    DEBUG = True

    # set url for main page
    main_url = "https://boss.latech.edu/ia-bin/tsrvweb.cgi?&WID=W&tserve_tip_write=||WID&ConfigName=rcrssecthp1&ReqNum=1&TransactionSource=H&tserve_trans_config=rcrssecthp1.cfg&tserve_host_code=HostZero&tserve_tiphost_code=TipZero"
    driver.get(main_url)

    # pick term
    select_term(driver, term)

    # create object to store collected data
    global all_data
    all_data = {}

    # get start time
    start_time = time.perf_counter()

    # grab list of all subjects
    all_subjects = scrape.pull_options_list(driver.page_source, "Subject")
    if DEBUG:
        print("------Begin Scrape!------")
    try:
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
                current_course = scrape.get_section_data(driver.page_source)
                # go back a tab
                driver.find_element('xpath', "//a[contains(text(), 'Select Another Course')]").click()
                # add new course to current subject
                current_subject[f"{course}"] = current_course
            # add new subject to all_data
            all_data[f"{subject}"] = current_subject
            # go back to main tab
            driver.get(main_url)
            select_term(driver, term)
    except KeyboardInterrupt:
        print(f"KeyboardInterrupt after {num_fails} fails! Exiting...")
        exit(1)
    except Exception as e:
        print("An exception occured!")
        print(f"{num_fails} fails so far")
        print(e)
        if num_fails < MAX_FAILS:
            print("Trying again...")
            run_scraper(term, output_to_json, num_fails + 1)
        else:
            print("Max number of fails reached! Exiting...")
            exit(1)
    else:
        print("Finished Successfully!")
        if DEBUG:
            print("------End Scrape!------")
        # get time elapsed and print
        elapsed_time = (time.perf_counter() - start_time)
        print(f"Time elapsed(s): {elapsed_time}")
        # output as json if specified
        if output_to_json:
            with open('output.json', 'w') as outfile:
                json.dump(all_data, outfile)

        return all_data
    finally:
        # if the program errors out 
        print("------End Scrape!------")
        elapsed_time = (time.perf_counter() - start_time)
        print(f"Time elapsed(s): {elapsed_time}")

# This code will not run if you import this file
#  It will only run if you do python3 seleniumNavigator.py
if __name__ == "__main__":
    # run with output enabled if directly executed
    run_scraper("Spring 2023", output_to_json=True)

