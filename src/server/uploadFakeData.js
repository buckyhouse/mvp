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
    revenueModel: 'Advertising',
    advertiserId: '1',
    daysAvailable: '',
    fixedPayment: '',
    fileName: 'example.mp4',
    ipfs: 'QmWdhekgeYV6nieHBypJnB77nxAxrENHK12YCYB8UGdN97',
}

let data2 = {
    title: 'Mauris diam tellus convallis at lobortis',
    tags: '4k,full hd,travel,peru,america,8k',
    description: 'Nulla fringilla sit amet risus a euismod. Etiam eget viverra sem. Etiam lacinia cursus nunc sed lobortis. Morbi bibendum dui id ante pharetra, et mollis enim dignissim. Morbi sed pellentesque erat.',
    category: 'Short Movies',
    revenueModel: 'Fixed payment',
    daysAvailable: '60 days',
    advertiserId: '',
    fixedPayment: '5',
    fileName: 'example.mp4',
    ipfs: 'QmWdhekgeYV6nieHBypJnB77nxAxrENHK12YCYB8UGdN97',
}

let numberOfCopies = 50

start()

async function start() {
    const database = await Mongo.connect(MongoUrl, { useNewUrlParser: true })
    db = database.db()
    await deleteAll()
    await uploadFakeData()
}

async function uploadFakeData() {
    try {
        for(let i = 0; i < numberOfCopies; i++) {
            console.log('Uploading file')
            if(i % 3 == 0) {
                data2.date = Date.now()
                await db.collection('ipfsFiles').insertOne(data2, {
                    forceServerObjectId: true
                })
            } else {
                data.date = Date.now()
                await db.collection('ipfsFiles').insertOne(data, {
                    forceServerObjectId: true
                })
            }
        }
    } catch (e) {
        console.log('Error:', e)
    }
    process.exit(0)
}

async function deleteAll() {
    try {
        await db.collection('ipfsFiles').drop()
        console.log('Deleted all')
    } catch (e) {
        console.log('Error:', e)
    }
}
