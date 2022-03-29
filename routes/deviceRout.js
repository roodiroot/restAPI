const Router = require('express')
const router = new Router()
const deviceController = require('./../controllers/deviceController')
const checkRouter = require('../middleware/CheckRoleMiddleware')


router.post('/', checkRouter('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll )
router.get('/:id', deviceController.getId)
router.delete('/:id', checkRouter('ADMIN'), deviceController.deleteId)




module.exports = router