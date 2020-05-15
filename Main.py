import sys
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from Widgets import MainWindow


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
