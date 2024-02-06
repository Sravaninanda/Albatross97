const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Register route
router.get('/register',(req,res) => {
    res.render('register',{title: 'Register'});
});
router.post('/register',async(req,res) => {
    const{username,email,password,role} = req.body;
     try{
      const hashedPassword = await bcrpt.hash(password,10);
      const newUser = new User({ username,email,password,role});
      const savedUser = await newUser.save();
//Registration successfull,redirect to login page
        res.redirect('/auth/login');
} catch (error){
         res.render('register',{title: 'Register', error: 'Failed to register'})
          //res.status(500).json({error: 'Internal Server Error'})
     }
});

//Login route 
router.get('/login',(req,res) => {
    res.render('login',{title:'Login'});
});

router.post('/login',async(req,res) => {
    try {
            const {email,password} = req.body;
            const user = await User.findOne({email});
    
            if (!user || !(await bcrypt.compare(password,user.password))){
                res.render('login', {title: 'Login',error: 'Invaid email or Password'});
            }else {
                res.redirect('/dashboard')
    
            }
    }catch (error) {
        res.render('login', {title:'Login',error: 'Failed to login'})
    }
});

module.exports = router; 
    