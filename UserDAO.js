function listUsers() {
  const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "34.168.103.146",
    user: "root",
    password: "songFanCanvas",
    port: "3306",
    database: "songCanvas"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("Select * FROM Users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});
}