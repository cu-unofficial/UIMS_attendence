from uims_api import SessionUIMS
import sys

args = sys.argv()

print(args)

my_account = SessionUIMS(args[1], args[2])


subjects = my_account.attendance


for subject in subjects:
    subject_attendance = "{} - {}%".format(subject["Title"], subject["TotalPercentage"])
    print(subject_attendance)