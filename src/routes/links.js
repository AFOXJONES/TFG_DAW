/*const express =require('express');
const router= express.Router();

const pool=require('../database');//pool hace referencia a la conexion a la bbdd

router.get('/add',(req,res)=>{
    res.render('game/index');
});

router.post('/add', async(req,res)=>{
    const {nombreUsu,passwd}=req.body; //destructuring
    const newUser={
        nombreUsu,
        passwd
    };
    await pool.query('INSERT INTO users set ?', [newUser]);
    res.render('game/index');
});

router.get('/', async (req,res)=>{//asincrona para poder hacer await
    const achievements=await pool.query('SELECT * FROM achievements');
    console.log(achievements);
    res.render('game/achievements',{achievements});
});

module.exports=router;
*/