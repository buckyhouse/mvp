const Mongo = require('mongodb').MongoClient
const path = require('path')
const IPFS = require('ipfs')
const keys = require('./secrets/secrets.js').keys
const MongoUrl = keys.MongoUrl
let db = {}

// It's just an empty object with those fields to avoid error messages when initializing
let ipfs = {
    files: {
        add: function() {}
    }
}

start()

async function start() {
    const database = await Mongo.connect(MongoUrl, { useNewUrlParser: true })
    db = database.db()
    await startIpfs()
}

function startIpfs() {
    return new Promise(resolve => {
        ipfs = new IPFS({
            init: true,
            start: true,
            config: {
                Bootstrap: [
                    "/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
                    "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
                    "/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
                    "/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
                    "/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
                    "/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64"
                ]
            }
        })

        ipfs.on('ready', () => {
            console.log('Ipfs is ready')
            resolve()
        })
    })
}

async function uploadFile(req, res) {
    const body = JSON.parse(req.body.stateObject)
    const file = req.files.file

    console.log('published hash', await publishFileIpfs(file.data))
    try {
        // Upload the file to IPFS and then add it to the ting
        await file.mv(path.join(__dirname, 'uploads', file.name))
        await db.collection('ipfsFiles').insertOne(body)
    } catch(e) {
        return res.status(333).json({success: false, msg: 'There was an error uploading the file, try again', error: e})
    }
    return res.status(200).json({success: true})
}

// Publishes a file to the ipfs network and returns the hash address
function publishFileIpfs(file) {
    return new Promise(async (resolve, reject) => {
        const fileHashAddress = await ipfs.files.add(
            new ipfs.types.Buffer(file)
        )
        resolve(fileHashAddress)
    })
}

module.exports = {
    uploadFile
}
