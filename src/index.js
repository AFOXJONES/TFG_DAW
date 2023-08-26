const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { PORT } = require('./config.js');
const pool = require('./database.js');
const Handlebars = require('handlebars');

const { database } = require('./keys');
// Initializations
const app = express();
require('./lib/passport');



// Settings
app.set('port', process.env.PORT || 4000);//si existe un puerto en el sistema, adquiere ese, sino, el 4000
app.set('views', path.join(__dirname, 'views'));//decirle a node.js donde esta la carpeta views
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
  secret: 'esteeselsecret', // Clave secreta para firmar la sesión y protegerla contra manipulaciones
  resave: false, // Indica si se debe volver a guardar la sesión incluso si no ha cambiado
  saveUninitialized: false, // Indica si se debe guardar una sesión nueva pero no modificada
  store: new MySQLStore(database) // Almacena las sesiones en la base de datos MySQL proporcionada
}));
app.use(flash());// Middleware para gestionar mensajes flash, que son mensajes temporales que se muestran al usuario en una sola petición y luego se eliminan
app.use(morgan('dev')); // Middleware para registrar información sobre las solicitudes HTTP en la consola en modo de desarrollo
app.use(express.urlencoded({ extended: false }));// Middleware para analizar los datos codificados en la URL enviados desde formularios HTML
app.use(express.json());// Middleware para analizar los datos JSON enviados en las solicitudes HTTP
app.use(passport.initialize());// Inicializa Passport, un middleware para autenticación de usuarios
app.use(passport.session());// Middleware para habilitar el soporte de sesiones de Passport


// Variables Globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;// para acceder a user desde cualquier view
  next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
//app.use('/game',require('./routes/links'));


// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
  console.log("Server on port: ", app.get('port'));
})

/*
// ESTO PARA DESPLIEGUE; ELIMINAR EL DE ARRIBA SI ESTA EN DESPLIEGUE Y VICEVERSA
app.listen(PORT, '0.0.0.0',()=>{
    console.log("Server on port: ",PORT);
});

app.listen(8080, '0.0.0.0', () => {
    console.log('Server is listening on port 8080');
  });
  

  app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log('Server is listening on port', process.env.PORT);
});
*/
app.get('/jugador1gana', (req, res) => {
  const id_user = req.user.nombreUsu;

  const insertQuery = `
    INSERT INTO games (user_id, player1_wins, player2_wins, games_played)
    SELECT ?, 0, 0, 0
    FROM dual
    WHERE NOT EXISTS (
      SELECT 1
      FROM games
      WHERE user_id = ?
    );
  `;

  const updateQuery = `
    UPDATE games
    SET player1_wins = player1_wins + 1,
      games_played = games_played + 1
    WHERE user_id = ?;
  `;

  pool.query(insertQuery, [id_user, id_user])
    .then(() => {
      console.log('Inserción realizada con éxito');
      // Ahora ejecutamos la consulta de actualización
      return pool.query(updateQuery, [id_user]);
    })
    .then(() => {
      console.log('Actualización realizada con éxito');
      res.send('Consulta ejecutada con éxito');
    })
    .catch(error => {
      console.error('Error al ejecutar la consulta: ', error);
      res.status(500).send('Error al ejecutar la consulta');
    });
});

// Ruta para manejar la solicitud del cliente cuando el jugador 2 gane
app.get('/jugador2gana', (req, res) => {
  const id_user = req.user.nombreUsu;


  const insertQuery = `
    INSERT INTO games (user_id, player1_wins, player2_wins, games_played)
    SELECT ?, 0, 0, 0
    FROM dual
    WHERE NOT EXISTS (
      SELECT 1
      FROM games
      WHERE user_id = ?
    );
  `;

  const updateQuery = `
    UPDATE games
    SET player2_wins = player2_wins + 1,
      games_played = games_played + 1
    WHERE user_id = ?;
  `;

  pool.query(insertQuery, [id_user, id_user])
    .then(() => {
      console.log('Inserción realizada con éxito');
      // Ahora ejecutamos la consulta de actualización
      return pool.query(updateQuery, [id_user]);
    })
    .then(() => {
      console.log('Actualización realizada con éxito');
      res.send('Consulta ejecutada con éxito');
    })
    .catch(error => {
      console.error('Error al ejecutar la consulta: ', error);
      res.status(500).send('Error al ejecutar la consulta');
    });
});
// Ruta para manejar la solicitud del cliente cuando se reinicie la partida
app.get('/reiniciarpartida', (req, res) => {
  // Aquí puedes escribir el código para realizar las operaciones en la base de datos correspondientes al reinicio de la partida
  // Por ejemplo, puedes utilizar una biblioteca como `mysql` para interactuar con la base de datos y ejecutar una consulta UPDATE
  // Luego, puedes enviar una respuesta al cliente para indicar el éxito o el fracaso de la operación
  res.send('Partida reiniciada');
});








app.get('/meterLogros', (req, res) => {
  const id_user = req.user.nombreUsu;
  const achievements = [1, 2, 3, 4, 5, 6, 7];

  const promises = achievements.map(id_achievement => consultarLogros(id_user, id_achievement));

  Promise.all(promises)
    .then(results => {
      // El array 'results' contendrá los resultados de cada consulta
      console.log('Resultados de los logros:', results);
      res.send('Consultas ejecutadas con éxito');
    })
    .catch(error => {
      console.error('Error al ejecutar las consultas: ', error);
      res.status(500).send('Error al ejecutar las consultas de logros');
    });
});


const consultarLogros = async (id_user, id_achievement) => {
  const selectQuery = `
    SELECT * FROM user_achievement WHERE id_user = ? AND id_achievement = ?;
  `;

  try {
    const results = await pool.query(selectQuery, [id_user, id_achievement]);
    console.log('ESTAMOS HACIENDO SELECT');

    if (results.length > 0) {
      // El logro ya existe
      console.log("QUE SI SE ENCUENTRA");
      return true;
    } else {
      // El logro no existe, comprobamos las condiciones en la tabla games
      const gamesPlayedQuery = `
        SELECT games_played, player1_wins, player2_wins FROM games WHERE user_id = ?;
      `;
      const gamesPlayedResult = await pool.query(gamesPlayedQuery, [id_user]);
      const gamesPlayed = gamesPlayedResult[0].games_played;
      const player1Wins = gamesPlayedResult[0].player1_wins;
      const player2Wins = gamesPlayedResult[0].player2_wins;

      // Realizamos las comprobaciones de logros según el id_achievement
      if (id_achievement === 1 && gamesPlayed >= 1) {
        // Logro de jugar al menos 1 partida
        const insertQuery = `
          INSERT INTO user_achievement (id_user, id_achievement) VALUES (?, ?);
        `;
        await pool.query(insertQuery, [id_user, id_achievement]);

        console.log("Logro 1 desbloqueado e insertado en la tabla user_achievements");
        return true;
      } else if (id_achievement === 2 && gamesPlayed >= 10) {
        // Logro de jugar al menos 10 partidas
        const insertQuery = `
          INSERT INTO user_achievement (id_user, id_achievement) VALUES (?, ?);
        `;
        await pool.query(insertQuery, [id_user, id_achievement]);

        console.log("Logro 2 desbloqueado e insertado en la tabla user_achievements");
        return true;
      } else if (id_achievement === 3 && gamesPlayed >= 50) {
        // Logro de jugar al menos 50 partidas
        const insertQuery = `
          INSERT INTO user_achievement (id_user, id_achievement) VALUES (?, ?);
        `;
        await pool.query(insertQuery, [id_user, id_achievement]);

        console.log("Logro 3 desbloqueado e insertado en la tabla user_achievements");
        return true;
      } else if (id_achievement === 4 && player1Wins >= 1) {
        // Logro de victoria del jugador 1
        const insertQuery = `
          INSERT INTO user_achievement (id_user, id_achievement) VALUES (?, ?);
        `;
        await pool.query(insertQuery, [id_user, id_achievement]);

        console.log("Logro 4 desbloqueado e insertado en la tabla user_achievements");
        return true;
      } else if (id_achievement === 5 && player2Wins >= 1) {
        // Logro de victoria del jugador 2
        const insertQuery = `
          INSERT INTO user_achievement (id_user, id_achievement) VALUES (?, ?);
        `;
        await pool.query(insertQuery, [id_user, id_achievement]);

        console.log("Logro 5 desbloqueado e insertado en la tabla user_achievements");
        return true;
      } else if (id_achievement === 6 && player1Wins >= 50) {
        // Logro de 50 victorias del jugador 1
        const insertQuery = `
          INSERT INTO user_achievement (id_user, id_achievement) VALUES (?, ?);
        `;
        await pool.query(insertQuery, [id_user, id_achievement]);

        console.log("Logro 6 desbloqueado e insertado en la tabla user_achievements");
        return true;
      } else if (id_achievement === 7 && player2Wins >= 50) {
        // Logro de 50 victorias del jugador 2
        const insertQuery = `
          INSERT INTO user_achievement (id_user, id_achievement) VALUES (?, ?);
        `;
        await pool.query(insertQuery, [id_user, id_achievement]);

        console.log("Logro 7 desbloqueado e insertado en la tabla user_achievements");
        return true;
      } else {
        // No se cumple ninguna condición para desbloquear el logro
        console.log("No se cumple la condición para desbloquear el logro");
        return false;
      }
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta: ', error);
    throw error;
  }
};



// Definición del helper isAchievementAcquired en el servidor
Handlebars.registerHelper('isAchievementAcquired', function (index, id_user, options) {
  const id_achievement = index + 1; // El índice comienza en 0, por lo que se suma 1 para obtener el ID de logro correspondiente

  // Realiza la consulta para verificar si el logro está en la tabla user_achievement
  const selectQuery = `
    SELECT * FROM user_achievement WHERE id_user = ? AND id_achievement = ?;
  `;
  
  pool.query(selectQuery, [id_user, id_achievement], function (error, results,options) { 
    if (error) {
      console.error(error);
      return options.inverse(this);
    } else {
      // Si se encontraron resultados, el logro está conseguido y se ejecuta el bloque 'if', de lo contrario, se ejecuta el bloque 'else'
  
      console.log((results.length > 0) ? "true" : "false"); 
      if (results.length > 0) {
        return new Handlebars.SafeString("true");
      } else {
        return new Handlebars.SafeString("false");
      }
    }
  });
});


Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return null;
});