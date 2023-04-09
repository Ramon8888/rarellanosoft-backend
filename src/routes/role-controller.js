const express = require('express')
const CatRoleBusiness = require('../business/role-business')
const router = express.Router()

const searchActiveRolesUrl = '/active-roles'

router.get(searchActiveRolesUrl, async (req, res) => {
    let rolesList = CatRoleBusiness
    rolesList.findAllActiveRoles()

})
module.exports = router;