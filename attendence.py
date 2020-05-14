from uims_api import SessionUIMS


def get_attendance():
    x = SessionUIMS(uid="", password="")
    datas = x.attendance
    subjects = []
    for data in datas:
        subjects.append({
            'Subject': data['Title'],
            'attendance': data['TotalPercentage']
        })

    return subjects