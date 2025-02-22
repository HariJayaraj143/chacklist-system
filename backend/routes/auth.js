const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body
    if (!name || !email || !password)
      return res.status(400).json({message: 'All fields are required.'})

    const existingUser = await User.findOne({email})
    if (existingUser)
      return res.status(400).json({message: 'Email already exists.'})

    const user = new User({name, email, password})
    await user.save()

    res.status(201).json({message: 'User registered successfully.'})
  } catch (error) {
    res.status(500).json({message: 'Server error.'})
  }
})

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    if (!email || !password)
      return res.status(400).json({message: 'All fields are required.'})

    const user = await User.findOne({email})
    if (!user) return res.status(400).json({message: 'Invalid credentials.'})

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({message: 'Invalid credentials.'})

    const token = jwt.sign({id: user._id}, 'secretkey', {expiresIn: '1h'})
    res.status(200).json({token})
  } catch (error) {
    res.status(500).json({message: 'Server error.'})
  }
})

module.exports = router
