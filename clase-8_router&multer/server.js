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
   const id = Number(dataBase.getAll().length+1)

    const {name, price} = req.body
    dataBase.saveFile({id, name, price})
    res.send(`El id asignado es: ${id}`)

})

router.put(`/:id`, (req, res) => {
    const data = dataBase.getAll()
    const myId = Number(req.params.id)
    
    const checkStock = data.some((product)=> product.id === myId)
    if (checkStock == true) {
        const {name, price} = req.body
        dataBase.editById(myId, name, price)
        res.send(`El id ${myId} se modificó con éxito`)
    } else {
        res.status(404).send(`No se encontró el id ${myId}.`)
    }
})

const server = app.listen(PORT, ()=>{
    console.log(`Server http on ${PORT}...`);
})
server.on('error', error => console.log('Error on server', error))