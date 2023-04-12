from dataclasses import dataclass

## Class for data collection ##
@dataclass(slots=True)
class sectionData:
    sectionTitle: str
    callNumber: str
    status: str
    activity: str
    modality: str
    daysTimeLocation: str
    instructor: str
    creditHours: str
    isCombined: bool = False
    combinedDaysTimeLocation: str = ""

## Test for use of data structure
# all_data = {}
# subject1 = {}
# course1 = []
# class1 = classData("J. Terry", "M, W, F", "11:00a-3:00p", 34927)
# course1.append(class1)
# subject1["Course1"] = course1
# all_data["Subject1"] = subject1
# print(all_data["Subject1"]["Course1"][0].profName)
