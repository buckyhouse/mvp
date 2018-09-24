const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 8123

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public', 'dist')))

// Logger middleware
app.use('*', (req, res, next) => {
    console.log(`\nRequesting: ${req.originalUrl} from ${req.ip}`)
    next()
})

// To send the index
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/dist/index.html'))
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on 18.222.204.62:${port}`)
})
