const Mongo = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const path = require('path')
const keys = require('./secrets/secrets.js').keys
const MongoUrl = keys.MongoUrl
let db = {}
let data = {
    title: 'Mauris diam tellus convallis at lobortis',
    tags: '4k,full hd,travel,peru,america,8k',
    description: 'Nulla fringilla sit amet risus a euismod. Etiam eget viverra sem. Etiam lacinia cursus nunc sed lobortis. Morbi bibendum dui id ante pharetra, et mollis enim dignissim. Morbi sed pellentesque erat.',
    category: 'Short Movies',
    advertiserId: 1,
    fileName: 'example.mp4',
    ipfs: 'QmWdhekgeYV6nieHBypJnB77nxAxrENHK12YCYB8UGdN97'
}
let numberOfCopies = 50

start()

async function start() {
    const database = await Mongo.connect(MongoUrl, { useNewUrlParser: true })
    db = database.db()
    uploadFakeData()
}

async function uploadFakeData() {
    try {
        for(let i = 0; i < numberOfCopies; i++) {
            await db.collection('ipfsFiles').insertOne(data, {
                forceServerObjectId: true
            })
        }
    } catch (e) {
        console.log('Error:', e)
    }
    process.exit(0)
}
