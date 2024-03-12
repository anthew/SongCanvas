const db = require("./database.js");

class LoginDAO {
    async isLoginValid(email, password) {

        return new Promise((resolve, reject) => {
            // Execute SQL query that'll select the account from the database based on the specified username and password
            db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
                
                // If there is an issue with the query, reject the promise
                if (error) {
                    reject(error);
                    return;
                }

                // If the account exists, resolve the promise with true
                if (results.length > 0) {
                    resolve(true);
                } else {
                    // If the account doesn't exist, resolve the promise with false
                    resolve(false);
                }
            });
        });
    }
}

module.exports = LoginDAO;