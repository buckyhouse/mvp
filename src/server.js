const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const functions = require('./server/functions.js')
const fileUpload = require('express-fileupload')
const port = 8123

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public', 'dist')))
app.use(fileUpload())

// Logger middleware
app.use('*', (req, res, next) => {
    console.log(`\nRequesting: ${req.originalUrl} from ${req.ip}`)
    next()
})

app.post('/upload-file', (req, res) => {
    functions.uploadFile(req, res)
})

// Send the build file for sub-urls
app.get('*/build.js', (req, res) => {
    console.log(req.originalUrl)
    return res.sendFile(path.join(__dirname, 'public/dist/build.js'))
})

// To send the index
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/dist/index.html'))
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on 18.222.204.62:${port}`)
})
