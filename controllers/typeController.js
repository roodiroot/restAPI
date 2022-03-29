const { Type } = require('../models/models')
class typeController {
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        res.json(type)
    }
    async getAll(req, res){
        const type = await Type.findAll()
        res.json(type)
    }
}

module.exports = new typeController()