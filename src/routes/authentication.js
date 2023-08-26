const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const {isLoggedIn, isNotLoggedIn} = require('../lib/checkAuth');

// Ruta para mostrar la página principal del juego
router.get('/game', isLoggedIn, (req, res) => {
    res.render('game/index');
});

router.get('/menu', isLoggedIn, (req, res) => {
    res.render('game/menu');
});

// Ruta para mostrar el formulario de registro
router.get('/signup',isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

// Ruta para procesar el formulario de registro
router.post('/signup',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/menu',
        failureRedirect: '/signup',
        failureFlash: true
    })(req, res, next);
});

// Ruta para mostrar el formulario de inicio de sesión
router.get('/signin',isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

// Ruta para procesar el formulario de inicio de sesión
router.post('/signin',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/menu',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});




// Ruta para mostrar los logros del juego (asíncrona)
router.get('/game/achievements', isLoggedIn, async (req, res) => {
    const userId = req.user.nombreUsu;
    const achievements = await pool.query('SELECT * FROM user_achievement WHERE id_user = ?', [userId]);
    console.log(achievements);
    res.render('game/achievements', { achievements });
});





router.get('/profile',isLoggedIn, (req,res)=>{
    res.render('profile')
});

router.get('/logout',isLoggedIn, (req,res)=>{
    req.logOut(function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send('Error en el logout');
        }
    res.redirect('/signin');
    });
});









module.exports = router;
