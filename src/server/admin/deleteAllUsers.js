const Mongo = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const keys = require('./../secrets/secrets.js').keys
const MongoUrl = keys.MongoUrl
let db = {}

start()

async function start() {
    const database = await Mongo.connect(MongoUrl, { useNewUrlParser: true })
    db = database.db()
    await deleteAll()
}

async function deleteAll() {
    try {
        await db.collection('users').drop()
        console.log('Deleted all')
    } catch (e) {
        console.log('Error:', e)
    }
    process.exit(0)
}
