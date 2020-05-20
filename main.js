const { app, Tray, Menu, BrowserWindow } = require('electron')
const path = require('path')


const iconpath = path.join(__dirname, 'ninja.png')
let appIcon = null
let win = null 

app.on('ready',()=> {
    win = new BrowserWindow({show: false})
    appIcon = new Tray(iconpath)
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Exit',
            type: 'normal',
            click: () => {
                process.exit()
            }
        }
    ])
    appIcon.setContextMenu(contextMenu)
    appIcon.on('click',()=>{
        let mainWindow = new BrowserWindow({
            show: true,
            webPreferences: {
                nodeIntegration: true
            }
        })

        mainWindow.loadFile('./index.html')
        mainWindow.webContents.openDevTools()
        const customMenu = Menu.buildFromTemplate([
            {label: 'Login',type: "normal", click: () => {
                console.log('Login Process')
            }}
        ])
        Menu.setApplicationMenu(customMenu)
    })
})

app.allowRendererProcessReuse = true
