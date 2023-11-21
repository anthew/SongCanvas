const mysql = require('mysql');

const con = mysql.createConnection({
  host: "34.168.103.146",
  user: "root",
  password: "songFanCanvas",
  port: "3306",
  database: "songCanvas"
});

function checkCredentials(email, password, callback) {
  con.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      callback(err, null);
      return;
    }

    if (results.length > 0) {
      // User found
      callback(null, true);
    } else {
      // No user found or password doesn't match
      callback(null, false);
    }
  });
}

// Example usage:
// const emailToCheck = 'test@gmail.com';
// const passwordToCheck = 'test';
const emailToCheck = document.getElementById('email-input').value;
const passwordToCheck = document.getElementById('password-input').value;

checkCredentials(emailToCheck, passwordToCheck, (err, isAuthenticated) => {
  if (err) {
    console.error('Error checking credentials: ' + err.stack);
    return;
  }

  if (isAuthenticated) {
    console.log('Authentication successful');
    window.location.href = '/html/dashboard.html';
  } else {
    console.log('Authentication failed');
  }

  // Close the database connection
  con.end((err) => {
    if (err) {
      console.error('Error closing the database connection: ' + err.stack);
    } else {
      console.log('Connection closed.');
    }
  });
});