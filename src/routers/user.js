const express = require('express')
const User = require('../models/user')
const Auth = require('../middleware/auth')

const router = new express.Router()

//signup
router.post('/users/signin', async (req, res) => {
    const user = new User(req.body)
console.log(req.body)
console.log(req.body.name)
console.log(req.body.email)
    try {
            console.log("signingg up")
        await user.save()
        console.log("signed up")

        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})

//login

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//logout
router.post('/users/logout', Auth, async (req, res) => {
   
    try {
       req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token 
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})



module.exports = router