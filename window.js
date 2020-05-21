const {spawn} = require('child_process')
const fs = require('fs')
const {ipcRenderer} = require('electron')

let sub = null

function onStart() {
    fs.readFile('./cred.json', 'utf8', (err, res) => {
        if (err) {
            document.getElementById('att').innerText = "We don't have your credentials, save them first"
        }
        let data = JSON.parse(res.toString())
        sub = spawn('python', ["./backend/main.py", data.uid, data.password])

        sub.stdout.on('data', (data) => {
            let res = data.toString()
            let result = JSON.parse(res)
            let table = document.createElement('table')
            table.className = "centered highlight"
            generateTable(table, result)
            document.getElementById('att').innerText = ''
            document.getElementById('att').appendChild(table)
        })

        sub.stdout.on('error', () => {
            document.getElementById('att').innerText = "We don't have your credentials, save them first"
        })
    })
}

onStart()

function generateTable(table, data) {
    let thead = table.createTHead();

    let row = thead.insertRow()
    for (let key in data) {
        let th = document.createElement("tr")
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')

        let subject = document.createTextNode(key)
        let attendance = document.createTextNode(data[key])
        td1.append(subject)
        td2.append(attendance)
        th.append(td1)
        th.append(td2)
        row.appendChild(th)
    }

}

ipcRenderer.on('update-attendance', (event, args) => {
    alert(args.uid)
})