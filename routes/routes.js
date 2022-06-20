const express = require('express')
const router = express.Router()

const  { 
    getData, 
    sendData,
    getDataById,
    getDataByUser
} = require('../controllers/logs.js')

const getStats = require('../controllers/stats.js')

router.get('/logs', getData)
router.get('/logs/session/:sessionID', getDataById)
router.get('/logs/user/:userID', getDataByUser)
router.get('/stats', getStats)
router.post('/logs', sendData) 


module.exports = router