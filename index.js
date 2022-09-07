const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5100

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage
})
app.use('/images', express.static('images'))


app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).send({ file: `https://upload.saifulearn.com/images/${req.file.filename}` })
})

app.get('/', (req, res) => {
    res.status(200).send({ status: `srever is Running On Port ${port}` })
})
app.listen(port, () => {
    console.log('server is running')
})

