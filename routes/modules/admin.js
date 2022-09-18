const router = require('express').Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')

router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)
router.get('/restaurants/create', adminController.createRestaurant)
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.delete('/restaurants/:id', adminController.deleteRestaurant)

router.get('/users', adminController.getUsers)
router.patch('/users/:id', adminController.patchUser)
router.use('/', (req, res) => { res.redirect('/admin/restaurants') })

module.exports = router
