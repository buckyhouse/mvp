const Mongo = require('mongodb').MongoClient
const path = require('path')
const keys = require('./secrets/secrets.js').keys
const MongoUrl = keys.MongoUrl
let db = {}

start()

async function start() {
    const database = await Mongo.connect(MongoUrl, { useNewUrlParser: true })
    db = database.db()
}

async function uploadFile(req, res) {
    const body = JSON.parse(req.body.stateObject)
    const file = req.files.file

    try {
        // Upload the file to IPFS and then add it to the ting
        await file.mv(path.join(__dirname, 'uploads', file.name))
        await db.collection('ipfsFiles').insertOne(body)
    } catch(e) {
        return res.status(333).json({success: false, msg: 'There was an error uploading the file, try again', error: e})
    }
    return res.status(200).json({success: true})
}

module.exports = {
    uploadFile
}
