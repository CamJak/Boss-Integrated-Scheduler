from sys import *
import json
import re
from models import sectionData


# Script to clean the data from the web scraper
def main():
    # Read input json file from command line
    try:
        file = open(argv[1], "r")
    except:
        print("Error: File not found")
        exit(1)

    # Read the json data to a dictionary
    try:
        data = json.load(file)
    except:
        print("Error: File is not in json format")
        exit(1)

    # Close the file
    file.close()

    # Iterate through the dictionary and clean the data
    for subject in data:
        for course in data[subject]:
            for i in range(len(data[subject][course])):
                section = data[subject][course][i]
                # Implement cleaning for each part of section model on calendar
                cleanSection = {}

                # Clean the section title
                cleanSection['sectionTitle'] = re.sub(' -','-',section['sectionTitle'])

                # Clean the call number
                cleanSection['callNumber'] = section['callNumber']

                # Clean the status
                cleanSection['status'] = re.sub('  ',' ',section['status'])

                # Clean the activity
                cleanSection['activity'] = section['activity']

                # Clean the modality
                cleanSection['modality'] = section['modality']

                # Clean the days
                # Pull just the days from the string
                cleanSection['days'] = re.split('[0-9]',section['daysTimeLocation'])[0]

                # Clean the time
                # Pull first time from the string and convert to 24 hour time
                try:
                    temp = re.findall(r'[0-9]{2}:[0-9]{2}',section['daysTimeLocation'])[0]
                    if int(temp[:2]) <= 7:
                        temp = str(int(temp[:2]) + 12) + temp[2:]
                    cleanSection['timeStart'] = temp
                    temp = re.findall(r'[0-9]{2}:[0-9]{2}',section['daysTimeLocation'])[1]
                    if ("PM" in re.findall(r'[0-9][A-Z]{2}', section['daysTimeLocation'])[0])  and (int(temp[:2]) < 12):
                        temp = str(int(temp[:2]) + 12) + temp[2:]
                    cleanSection['timeStop'] = temp
                except:
                    cleanSection['timeStart'] = ""
                    cleanSection['timeStop'] = ""

                # Clean the location
                # Do not add cancelled sections
                temp = section['daysTimeLocation'].strip()
                if "CANCELLED" in temp:
                    continue
                if (temp != 'Main Campus'):
                    if "Arrange" in temp:
                        temp = re.split(r'Arrange[d]* ', temp)[1]
                    else:
                        temp = re.split(r'AM|PM ', temp)[1]
                    if (temp != 'Main Campus'):
                        temp = re.sub('Main Campus', '', temp)
                        temp = re.sub(r'([A-Za-z]+)([0-9]+)', r'\1 \2', temp)
                cleanSection['location'] = temp

                # Clean the instructor
                cleanSection['instructor'] = section['instructor']

                # Clean the credit hours
                cleanSection['creditHours'] = section['creditHours'].strip()

                # Clean the combined status
                cleanSection['isCombined'] = section['isCombined']

                if section['isCombined']:
                    # Clean the combined days
                    cleanSection['combinedDays'] = re.split('[0-9]',section['combinedDaysTimeLocation'])[0]

                    # Clean the combined time
                    # Pull first time from the string and convert to 24 hour time
                    try:
                        temp = re.findall(r'[0-9]{2}:[0-9]{2}',section['combinedDaysTimeLocation'])[0]
                        if int(temp[:2]) <= 7:
                            temp = str(int(temp[:2]) + 12) + temp[2:]
                        cleanSection['combinedTimeStart'] = temp
                        temp = re.findall(r'[0-9]{2}:[0-9]{2}',section['combinedDaysTimeLocation'])[1]
                        if ("PM" in re.findall(r'[0-9][A-Z]{2}', section['combinedDaysTimeLocation'])[0]) and (int(temp[:2]) < 12):
                            temp = str(int(temp[:2]) + 12) + temp[2:]
                        cleanSection['combinedTimeStop'] = temp
                    except:
                        cleanSection['combinedTimeStart'] = ""
                        cleanSection['combinedTimeStop'] = ""

                    # Clean the combined location
                    temp = section['combinedDaysTimeLocation'].strip()
                    if (temp != 'Main Campus'):
                        if "Arrange" in temp:
                            temp = re.split(r'Arrange[d]* ', temp)[1]
                        else:
                            temp = re.split(r'AM|PM ', temp)[1]
                        if (temp != 'Main Campus'):
                            temp = re.sub('Main Campus', '', temp)
                            temp = re.sub(r'([A-Za-z]+)([0-9]+)', r'\1 \2', temp)
                    cleanSection['combinedLocation'] = temp
                else:
                    cleanSection['combinedDays'] = ""
                    cleanSection['combinedTimeStart'] = ""
                    cleanSection['combinedTimeStop'] = ""
                    cleanSection['combinedLocation'] = ""

                # Replace the old section with the new cleaned section
                data[subject][course][i] = cleanSection
    
    # Print the data to output json file
    try:
        file = open("outputCleaned.json", "w")
    except:
        print("Error: File not found")
        exit(1)

    # Write the json data to a file
    try:
        json.dump(data, file, indent=2)
    except:
        print("Error: File is not in json format")
        exit(1)
    
    # Close the file
    file.close()

if __name__ == "__main__":
    main()