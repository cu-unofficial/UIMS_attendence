import sys
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
import json


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
        print('Login')

    def _logout(self):
        print('Logout')


def quitApp():
    sys.exit()


window = None


def startApp():
    global window
    window = MainWindow()
    window.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    app.setQuitOnLastWindowClosed(False)

    # Load the icon
    icon = QIcon("logo.png")
    # Creating the Tray
    tray = QSystemTrayIcon()
    tray.setIcon(icon)
    tray.setVisible(True)
    # Creating the Menu
    menu = QMenu()
    """ Creating Actions """
    # Creating Quit Action
    quitAction = QAction('Quit')
    quitAction.triggered.connect(quitApp)
    menu.addAction(quitAction)

    # Creating the App
    attendance_action = QAction('Attendance')
    attendance_action.triggered.connect(startApp)
    menu.addAction(attendance_action)

    tray.setContextMenu(menu)
    app.exec_()
