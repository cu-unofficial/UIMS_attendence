const {spawn} = require('child_process')
const fs = require('fs')

console.log('Running python')
const sub = spawn('python', ["./backend/main.py", "uid", "password"])

sub.stdout.on('data', (data) => {
    let res = data.toString()
    let result = JSON.parse(res)
    for(let key in result){
        document.getElementById('att').innerText = `${key}  ---  ${result[key]}`
    }
})