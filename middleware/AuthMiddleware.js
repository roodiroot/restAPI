const jwt = require("jsonwebtoken")
const APIerror = require("../error/APIerror")

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
           return res.status(401).json({message: 'Не авторизован'})
        }
        const decoded = jwt.verify(token, process.env.SEKRET_KEY)
        req.user = decoded
        next()
    }catch(e){
        res.status(401).json({message: 'Не авторизован'})
    }
}