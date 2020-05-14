import sys
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *


class MainWindow(QMainWindow):
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        self.setGeometry(200, 200, 400, 300)


def quitApp():
    sys.exit()


def startApp():
    smallApp = QApplication([])
    window = MainWindow()
    window.show()
    smallApp.processEvents()
    smallApp.exec_()


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
