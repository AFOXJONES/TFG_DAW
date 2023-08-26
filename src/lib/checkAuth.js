module.exports = {

    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){//true si el usuario existe, sino existe es q no esta loggeado y retorna false
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){// caso contrario al de arriba, para no poder acceder al signin una vez loggeado
            return next();
        }
        return res.redirect('/menu');
    }

};