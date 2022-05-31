const fs = require('fs')

    class Container{
    constructor(object = {}){
     this.name = object?.name || ''
     this.price = object?.price || ''
     this.thumbnail = object?.thumbnail || ''
     this.db = [];
     this.readJson = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
    }
    
    saveFile(){
        const data = {
            name: this.name,
            price: this.price,
            id: this.readJson.length+1,
            thumbnail: this.thumbnail
        }

        this.db.push(...this.readJson, data)
        fs.writeFileSync('./data.json', JSON.stringify(this.db))

        console.log(`El id asignado es ${data.id}`);
        }

    getById(myId){
        this.readJson === '' ? {error: 'Producto no encontrado'} : ''
        
        const matchId = this.readJson.find((product)=> product.id === myId)
        return matchId == undefined ? {error: 'Producto no encontrado'} : matchId
        
    }

    deleteById(myId){
        const matchId = this.readJson.filter((product)=> product.id != myId)
        this.db.push(...matchId)

        fs.writeFileSync('./data.json', JSON.stringify(this.db))
    }

    deleteAll(){
        fs.writeFileSync('./data.json', JSON.stringify(this.db))
    }

    getAll(){
        return this.readJson
    }
}

module.exports = Container


// ---