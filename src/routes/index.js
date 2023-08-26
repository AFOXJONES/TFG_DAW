const express =require('express');
const router= express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../lib/checkAuth');

router.get('/',isNotLoggedIn,(req,res)=>{
    res.render('auth/signin');
});

module.exports=router;