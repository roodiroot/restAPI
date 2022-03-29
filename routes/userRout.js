const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/AuthMiddleware')


router.post('/registration', userController.registrtion)
router.post('/login', userController.login)
router.get('/auth',authMiddleware,  userController.chek)




module.exports = router