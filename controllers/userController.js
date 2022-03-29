// require('dotenv').config()
const APIerror = require("../error/APIerror")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, 
        process.env.SEKRET_KEY,{expiresIn: '24h',})
}

class userController {
    async registrtion(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(APIerror.badRequest('Введите имя пользователя и пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(APIerror.badRequest(`Пользователь с почтой ${email}  уже зарегестрирован`))
        }
        const haschPass = await bcrypt.hash(password, 5)
        const user = await User.create({
            email, role, password: haschPass
        })
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        res.json({token})

    }



    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(APIerror.internal('Пользовтель с таким логином не найден'))
        }
        const comparePass = bcrypt.compareSync(password, user.password)
        if(!comparePass) {
            return next(APIerror.badRequest('Пароль не верный'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        res.json({token})
    }



    async chek(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }
}

module.exports = new userController()