const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('./../models/User');
const util = require('./util');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    const { name, email, password, confirm } = req.body;
    util.emptyErrors();

    if (!name || !email || !password || !confirm) {
        util.pushError('All fields are required')
    }

    if (password != confirm) {
        util.pushError("Passwords do not match")
    }

    if (password.length < 8) {
        util.pushError("Password lenght needs to be at least 8 characters")
    }

    if (util.getErrors().length > 0) {
        res.render('register', { name, email, password, confirm, errors: util.getErrors()})
        
        return
    }

    User.findOne({ email: email})
        .then(user => {
            if (user) {
                util.pushError("Email is already registered");
                res.render('register', { name, email, password, confirm, errors: util.getErrors()});
                
                return;
            }
            const newUser = new User({
                name, 
                email, 
                password
            });
        });

    res.send('Passed..')
});

module.exports = router;