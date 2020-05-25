const fs = require('fs')
const {ipcRenderer} = require('electron')



document.getElementById('save').addEventListener('click',()=>{
    let uid = document.getElementById('uid').value
    let password = document.getElementById('password').value
    ipcRenderer.send('save-cred',{uid,password})
})



document.getElementById('cancel').addEventListener('click',()=>{
    window.close()
})