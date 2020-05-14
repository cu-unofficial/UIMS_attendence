import json


class Database:
    def __init__(self):
        self.fileName = "data.json"

    def signup(self, username, password):
        with open(self.fileName) as file:
            json.dump({
                "username": username,
                "password": password
            }, file)

    def logout(self):
        with open(self.fileName) as file:
            json.dump({}, file)

    def login(self) -> dict:
        with open(self.fileName) as file:
            data = json.load(file)
            return data
