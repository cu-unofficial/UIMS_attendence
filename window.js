const {spawn} = require('child_process')

const sub = spawn('python', ["./backend/main.py", 'username', 'password'])

sub.stdout.on('data', (data) => {
    console.log(data.toString())
    document.getElementById('att').innerText = data.toString()
})