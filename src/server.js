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
app.use(express.static(path.join(__dirname, 'public', 'dist', 'imgs')))
app.use(fileUpload())

// Logger middleware
app.use('*', (req, res, next) => {
    console.log(`\nRequesting: ${req.originalUrl} from ${req.ip}`)
    next()
})

app.get('/get-files', (req, res) => {
    functions.getFiles(req, res)
})

app.get('/get-account-type', (req, res) => {
    functions.getAccountType(req, res)
})

app.post('/upload-file', (req, res) => {
    functions.uploadFile(req, res)
})

app.post('/edit-file', (req, res) => {
    functions.editFile(req, res)
})

app.get('/delete-file', (req, res) => {
    functions.deleteFile(req, res)
})

// Send the build file for sub-urls
app.get('*/build.js', (req, res) => {
    console.log(req.originalUrl)
    return res.sendFile(path.join(__dirname, 'public/dist/build.js'))
})

// Send the build file for sub-urls
app.get('*/imgs/:image', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/dist/imgs', req.params.image))
})

// To send the index
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/dist/index.html'))
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on 13.59.158.99:${port}`)
})
