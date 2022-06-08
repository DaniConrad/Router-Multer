const express = require('express')
const { render } = require('express/lib/response')
const Container = require('./class') 

const app = express()
const dataBase = new Container()

const PORT = 8080

app.set('views', '../views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('index.ejs')
    
})

app.post('/products', (req, res) =>{
    const id = Number(dataBase.getAll().length+1)
    
     const {name, price, tumbnail} = req.body
     dataBase.saveFile({id, name, price, tumbnail})
     res.render('index.ejs')
     

 })
app.get('/products', (req, res) => {
    const db = dataBase.getAll()
    let message = ''
    db.length == 0 ? message = 'No hay productos' : message = 'Productos'

    res.render('products.ejs', {
        db,
        message
    })
})

const server = app.listen(PORT, ()=>{
    console.log(`Server http on ${PORT}...`);
})
server.on('error', error => console.log('Error on server', error))