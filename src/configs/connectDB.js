import mysql from 'mysql2/promise';

// create the connection to database

console.log(">>> Creating connection pool!");

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'

});

export default connection;