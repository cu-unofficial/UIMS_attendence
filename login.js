const fs = require('fs')



document.getElementById('save').addEventListener('click',()=>{
    let uid = document.getElementById('uid').value
    let password = document.getElementById('password').value
    fs.writeFile('./cred.json',JSON.stringify({
        uid: uid,
        password: password
    }),(err)=>{
        if(err){
            return console.log(err)
        }
        window.close()
    })
})

document.getElementById('cancel').addEventListener('click',()=>{
    window.close()
})