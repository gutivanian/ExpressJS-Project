const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 

// User model
const User = require('../models/User')

// Login page
router.get('/login', (req, res) => res.render('Login'))

// Register Page
router.get('/register', (req, res) => res.render('Register'))

// Post router handle
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body
    let errors = []

    // check required field
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'})
    }

    // check password match
    if(password2 !== password){
        errors.push({msg: 'Password do not match'})
    }

    // check password length
    if (password.length <6){
        errors.push({msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // validasi berhasil
        // cek eksistensi
        User.findOne({
            email: email
        }).then(user => {
            if(user){
                // user eksis
                errors.push({msg: "Email is already registered"})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            
            } else {
                // enkripsi
                const newUser = new User({
                    name, email, password
                })

                console.log(newUser)
                res.send('Hello')
            }
        })
    }
})


module.exports = router