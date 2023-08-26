const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'nombreUsu',
    passwordField: 'passwd',
    passReqToCallback: true
}, async(req,nombreUsu, passwd, done)=>{
    console.log("POR LO MENIOS ENTRAMOS");
    const rows = await pool.query('SELECT * FROM users WHERE nombreUsu = ?', [nombreUsu]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(passwd, user.passwd);
        console.log(validPassword);
        if(validPassword){
            done(null,user, req.flash('success','Welcome '+user.nombreUsu));
        }else{
            done(null,false,req.flash('message','Contraseña incorrecta (compruebe las mayusculas y minusculas)'));
        }
    }else{
        return done(null,false,req.flash('message','El usuario no existe en la base de datos'));
    }
}));



passport.use('local.signup', new LocalStrategy({
    usernameField: 'nombreUsu',
    passwordField: 'passwd',
    passReqToCallback: true
}, async (req, nombreUsu, passwd, done) => {
    const user = await pool.query('SELECT * FROM users WHERE nombreUsu = ?', [nombreUsu]);
    if (user.length > 0) {
        return done(null, false, req.flash('message', 'El usuario ya existe'));
    } else {
        const newUser = {
            nombreUsu,
            passwd
        };

        newUser.passwd = await helpers.encryptPassword(passwd); // encriptar de helpers.js
        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        return done(null, newUser);
    }
}));


passport.serializeUser((user,done)=>{
    done(null, user.nombreUsu);
});

passport.deserializeUser(async(nombreUsu,done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE nombreUsu = ?', [nombreUsu]);
    done(null,rows[0]);
})