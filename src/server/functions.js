function uploadFile(req, res) {
    console.log(req.body)
    console.log(req.files)
    return res.send('hi')
}

module.exports = {
    uploadFile
}
