from .uims_api import SessionUIMS


def getAttendence(uid, password):
    account = SessionUIMS(uid,password)
    subjects = account.attendance

    for subject in subjects:
        subject_attendence ="{} - {}%".format(subject["Title"], subject["TotalPercentage"])
        print(subject_attendence)