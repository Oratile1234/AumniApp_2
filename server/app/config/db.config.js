const Client = require("pg").Client;
// const client = new Client({
//   user: "admin",
//   host: "localhost",
//   database: "alumni",
//   password: " ",
//   port: 5432,
// }); 


 const client = new Client({
     connectionString: DB_URL = 'postgres://pcdqrvqyxachvs:382f091ea7544c52c6e829e6c02188c093b9f0aacf5ff01b28a56beffeddb0da@ec2-3-219-135-162.compute-1.amazonaws.com:5432/d4dsiascdpev0p',
     ssl:{
         rejectUnauthorized: false //allows external access to database when using nodejs
     }
 });

module.exports = client;  
   