const {spawn} = require('child_process')
const fs = require('fs')

const sub = spawn('python', ["./backend/main.py", "uid", "password"])

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

sub.stdout.on('data', (data) => {
    let res = data.toString()
    let result = JSON.parse(res)
    let table = document.createElement('table')
    table.className="centered highlight"
    generateTable(table,result)
    document.getElementById('att').innerText = ''
    document.getElementById('att').appendChild(table)
})