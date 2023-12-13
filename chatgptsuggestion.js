const connectWithConnector = require('./database.js'); // Adjust the path accordingly

async function executeQuery() {
  // Assuming you have the connection details in environment variables
  const pool = await connectWithConnector({});

  // Execute the query
  const query = 'SELECT * FROM Users';

  try {
    const [rows, fields] = await pool.query(query);
    console.log('Query results:', rows);
  } catch (error) {
    console.error('Error executing the query:', error);
  } finally {
    // Don't forget to release the pool when you're done with it
    pool.end();
  }
}

// Call the asynchronous function
executeQuery();