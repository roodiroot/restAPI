const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRouter = require('../middleware/CheckRoleMiddleware')



router.get('/', typeController.getAll)
router.post('/', checkRouter('ADMIN'), typeController.create)



module.exports = router