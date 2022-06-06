const express = require('express')
const fs = require('fs')

const app = express()

app.engine('dc', function (filePath, options, cb) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            return cb(new Error(err))
        }
        const rendered = content.toString()
            .replace('#title#', '<h1>' + options.title + '</h1>')
            .replace('#message#', '<p>' + options.message + '</p>')

        return cb(null, rendered)

    })
    
})

app.set('views', './views') //ruta html
app.set('view engine', 'dc')

app.get('/template', (req, res) => {
    res.render('index', {
        title: 'sup?', 
        message: 'Info plantilla'
    })
})

app.listen(8080)