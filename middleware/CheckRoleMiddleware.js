const jwt = require("jsonwebtoken")

module.exports = (role) => {
    return function (req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
               return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SEKRET_KEY)
            if(decoded.role != role) {
                return res.status(403).json({message: 'У вас нет прав на редактирование данного контента'})
            }
            req.user = decoded
            next()
        }catch(e){
            res.status(401).json({message: 'Не авторизован'})
        }
    }
}

