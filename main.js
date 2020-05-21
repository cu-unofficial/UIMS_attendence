const {app, Tray, Menu, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const {Database} = require('./data/Database')

const database = new Database()

const iconpath = path.join(__dirname, 'ninja.png')
let appIcon = null
let win = null
let loginWin = null
let mainWindow = null

app.on('ready', () => {
    win = new BrowserWindow({show: false})
    appIcon = new Tray(iconpath)
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Exit',
            type: 'normal',
            click: () => {
                process.exit()
            }
        },
        {
            label: 'Login',
            type: 'normal',
            click: () => {
                createLoginWindow()
            }
        }
    ])
    appIcon.setContextMenu(contextMenu)
    appIcon.on('click', () => {
        mainWindow = new BrowserWindow({
            show: true,
            webPreferences: {
                nodeIntegration: true
            },
            width: 400,
            height: 500,
            resizable: false
        })

        mainWindow.loadFile(path.join(__dirname, 'index.html'))
        // mainWindow.webContents.openDevTools()
        const customMenu = Menu.buildFromTemplate([
            {
                label: 'Save your credentials', type: "normal", click: () => {
                    createLoginWindow()
                }
            }
        ])
        Menu.setApplicationMenu(customMenu)
    })
})

app.allowRendererProcessReuse = true

function createLoginWindow() {
    loginWin = new BrowserWindow({
        show: true,
        webPreferences: {
            nodeIntegration: true
        },
        width: 500,
        height: 200,
        resizable: false,
        frame: false
    })
    loginWin.loadFile(path.join(__dirname, 'login.html'))

}

ipcMain.on('save-cred', async (event, {uid, password}) => {
    await database.saveCred({uid: uid, password: password})
    loginWin.close()
    event.sender.send('update-attendance', uid)
})