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
                preload: './src/js/index.js'
            }
        })

        mainWindow.loadFile(path.join(__dirname,'src','views','index.html'))
        const customMenu = Menu.buildFromTemplate([
            {label: 'Login',type: "normal", click: () => {
                console.log('Login Process')
            }}
        ])
        Menu.setApplicationMenu(customMenu)
    })
})