const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

const fakeApi = () => [
    {name: 'Beers', price:120},
    {name: 'anashe', price:1540},
    {name: 'asdfds', price:1230},
    {name: 'sarasasasa', price:110},
    {name: 'daniconrad', price:120},
]

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout:'index.hbs',
    layoutsDir:__dirname + '/views/layouts',
    partialsDir:__dirname + '/views/partials'
}))

app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.send('OK')
})

app.get('/template', (req, res) => {

})

app.listen(8080)