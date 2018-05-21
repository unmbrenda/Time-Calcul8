var mysql = require('mysql');

var connection 

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'enter ur pass here',
    database: 'eztime_db_test'
  });
};

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

// export connection
module.exports = connection;
