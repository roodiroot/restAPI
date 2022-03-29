const APIerror = require('../error/APIerror')

module.exports = (err, req, res, next) => {
    if(err instanceof APIerror) {
        return res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message: "Не предвиденная ошибка"})
}