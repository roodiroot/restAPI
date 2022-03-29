const uuid = require('uuid')
const path = require('path')

const { Device, DeviceInfo } = require('../models/models')
const APIerror = require('../error/APIerror')


class deviceController {
    async create(req, res, next) {

        try {
            const { name, price, typeId, brandId, info } = req.body
            const { img } = req.files
            const fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName})
            if(info){
                info = JSON.parse(info)
                info.foreach(i=>{
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }
            
            return res.json(device)
        } catch (e) {
            next(APIerror.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        limit = limit || 5
        page = page || 1
        let offset = page * limit - limit
        let devices
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }
    async getId(req, res) {
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        res.json(device)
    }
    async deleteId(req, res) {
        const {id} = req.params
        await Device.destroy({where: {id}})
        res.json({message: `Девайс с id ${id} удален`})
    }
}

module.exports = new deviceController()