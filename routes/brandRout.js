const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRouter = require('../middleware/CheckRoleMiddleware')



router.get('/', brandController.getAll)
router.post('/',checkRouter('ADMIN'), brandController.create)



module.exports = router