const express = require("express")
const router = express.Router()
// const cors = require('cors')
const { registerUser, loginUser, getProfile } = require('../controllers/authControllers')

// router.use(
//     cors({
//         credentials: true,
//         origin: 'https://food-delivery-app-final-evaluation-frontend-project-2oxo.vercel.app'
//     })
// )

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

module.exports = router