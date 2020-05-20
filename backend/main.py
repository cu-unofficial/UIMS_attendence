from uims_api import SessionUIMS
import sys

args = sys.argv

my_account = SessionUIMS(args[1], args[2])


subjects = my_account.attendance

response = '{'


for subject in subjects:
    subject_attendance = f""""{subject['Title']}": {subject['TotalPercentage']},"""
    response = response + subject_attendance

response = response[:-1] + '}'

print(response)