export interface Section {
    title: string,
    callNumber: string,
    status: string,
    activity: string,
    modality: string,
    days: string,       //put days as one concatenated string such as MWF or TH
    timeStart: string,  //put times in 24 hour time with format 09:00 etc.
    timeStop: string,
    location: string,
    instructor: string,
    creditHours: string
}