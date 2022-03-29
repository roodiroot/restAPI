const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRout')
const typeRouter = require('./typeRout')
const deviceRouter = require('./deviceRout')
const userRouter = require('./userRout')



router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/user', userRouter)



module.exports = router