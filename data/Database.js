const fs = require('fs')

class Database {
    constructor() {
        this.filePath = "./cred.json"
    }

    isSaved() {
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            let cred = JSON.parse(data.toString())
            return cred.saved
        })
    }

    saveCred({uid, password}) {
        if (uid === '' && password === '') {
            return
        }
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            let cred = JSON.parse(data.toString())
            cred.uid = uid
            cred.password = password
            cred.saved = true

            fs.writeFile(this.filePath, cred, (error) => {
                if (error) {
                    throw error
                }
                return
            })
        })
    }

    getCred() {
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            let cred = JSON.parse(data.toString())
            return cred
        })
    }
}

export default {
    Database
}