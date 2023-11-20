var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "34.168.103.146",
    user: "root",
    password: "songFanCanvas",
    port: "3306",
    database: "songCanvas"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("insert into Users(first_name, last_name, email, password) Values ('don', 'pollo', 'wazaaaa@outlook.com', 'ohmiamamagente')", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});