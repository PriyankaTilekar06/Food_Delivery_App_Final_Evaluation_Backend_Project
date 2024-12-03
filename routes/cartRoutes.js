const express = require("express")
const router = express.Router()
const cartControllers = require("../controllers/cartControllers")
router.post('/', cartControllers.addCart);
router.get('/:userId', cartControllers.getAllCart);
router.delete('/:cartId', cartControllers.deleteCart)
router.delete('/delete/:userId', cartControllers.deleteAllCart)

module.exports = router