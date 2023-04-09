const express = require('express')
const CatOriginCorsBusiness = require('../business/origin-cors-business')
const router = express.Router()

const newOriginUrl = '/new-origin'

router.post(newOriginUrl, async (req, res) => {
    let createNewOrigin = CatOriginCorsBusiness
    createNewOrigin.createOrigin(req, res)

})
module.exports = router;