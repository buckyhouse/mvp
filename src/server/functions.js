function uploadFile(req, res) {
    console.log(req.body)
    console.log(JSON.parse(req.body.stateObject))
    console.log(req.files)
    return res.send('hi')
}

module.exports = {
    uploadFile
}
