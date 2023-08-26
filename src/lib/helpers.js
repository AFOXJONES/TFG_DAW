const bcrypt =require('bcryptjs');



const helpers ={};


//metodo para encriptar la contraseña al registrarse
helpers.encryptPassword = async (passwd) => {
  const salt = await bcrypt.genSalt(10); // Generar una sal sincrónicamente
  const finalPasswd = await bcrypt.hash(passwd, salt); // Cifrar la contraseña sincrónicamente
  console.log("ESTA ES: "+finalPasswd)
  return finalPasswd;
};


//metodo para desencriptar y comparar la contraseña de la bbdd al loguearse
helpers.matchPassword= async (passwd, savedPasswd) =>{
    try{
        console.log(passwd);
        console.log(savedPasswd);
        return await bcrypt.compare(passwd, savedPasswd);
    }catch(e){
        console.log('ERROR EN MATCHPASSWD: '+e);
    }

};





module.exports=helpers;