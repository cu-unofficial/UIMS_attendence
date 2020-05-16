import json

from PyQt5.QtCore import QThread
from PyQt5.QtWidgets import *

from data import Database
import time

loginWindow = None


class MainWindow(QMainWindow):
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        with open('user.json') as file:
            data = json.load(file)
            self.isLogin = data['isLogin']
        self.setGeometry(200, 200, 600, 400)
        self.setWindowTitle('Attendance')

        self.toolbar = QToolBar('My Main Toolbar')
        self.addToolBar(self.toolbar)

        self.login_action = QAction('Login', self)
        self.login_action.triggered.connect(self._login)
        self.logout_action = QAction('Logout', self)
        self.logout_action.triggered.connect(self._logout)

        if self.isLogin:
            self.toolbar.addAction(self.logout_action)
        else:
            self.toolbar.addAction(self.login_action)

    def _login(self):
        global loginWindow
        loginWindow = LoginWindow()
        loginWindow.show()

    def _logout(self):
        print('Logout')


class LoginWindow(QMainWindow):
    def __init__(self, *args, **kwargs):
        super(LoginWindow, self).__init__(*args, **kwargs)
        self.setGeometry(220, 220, 400, 150)
        self.setWindowTitle('Login')

        self.mainLabel = QLabel('Login With your CUIMS account')
        self.username = QLineEdit()
        self.password = QLineEdit()
        self.login_btn = QPushButton('Login')
        self.login_btn.clicked.connect(self._login)

        self.layout = QVBoxLayout()
        self.layout.addWidget(self.mainLabel)
        self.layout.addWidget(self.username)
        self.layout.addWidget(self.password)
        self.layout.addWidget(self.login_btn)
        self.widget = QWidget()
        self.widget.setLayout(self.layout)

        self.setCentralWidget(self.widget)

    def _login(self):
        username = self.username.text()
        password = self.password.text()
        print(username, password)