const express = require('express')
const { Router } = express
const multer = require('multer')
const Container = require('./class') 

const dataBase = new Container()
const app = express()
const router = Router()

app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products', router)

const PORT = 8080

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public')
    },
    filename: (req, file, cb) =>{
        const time = Date.now()
        cb(null, time + '-' + file.originalname)
    },
})

const upload = multer({storage})

router.get('/', (req, res) =>{
    const data = dataBase.getAll()
    res.json(data)
})

router.get(`/:id`, (req, res) =>{
    const myId = Number(req.params.id)
    const dataId = dataBase.getById(myId)
    res.json(dataId)
})

router.delete(`/:id`, (req, res) =>{
    const myId = Number(req.params.id)
    const dataId = dataBase.deleteById(myId)
    res.json(dataId)
})

router.post('/', (req, res) =>{
    const dataBase = new Container(req.body)
    dataBase.saveFile()
    res.send('saved')
})

const server = app.listen(PORT, ()=>{
    console.log(`Server http on ${PORT}...`);
})
server.on('error', error => console.log('Error on server', error))