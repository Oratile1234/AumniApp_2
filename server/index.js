const express = require("express"); // import express library
const cors = require("cors"); //import cors module
const app = express(); //Initialize express
var corsOptions = {
  origin: ["https://whimsical-cendol-dcf7d0.netlify.app","*","http://localhost:*","http://localhost:4200","http://0.0.0.0:4200"],
  'Access-Control-Allow-Origin': '*',
  methods: "GET,PUT,POST,DELETE,PATCH"
};// only allow that listerning address to connnect to the database
const bodyParser = require('body-parser')

// require("./App/config/dotenv.config"); //Import your environmental configs
const client = require ("./app/config/db.config");
const company = require("./app/routes/company.routes");
const signin = require("./app/routes/auth.route");
const users = require("./app/routes/users.routes");
const portfolio = require("./app/routes/portfolio.route");
const reset = require("./app/routes/reset.route")

app.use(express.json());  // to support JSON-encoded 
app.use(cors(corsOptions));
 
app.use(express.urlencoded({ extended: true }));
// simple route  // to support JSON-encoded 
// app.use( cors({origin: true, credentials: true}) )
 
app.use(bodyParser.json()) 
app.use( 
    bodyParser.urlencoded({    
        extended: true    
    })   
);       
  
const port = process.env.PORT || 7073; 
  
// const hostURL = '0.0.0.0'; //Fault-Tolerant listening port for Backend. Picks available dynamic IPv4 and IPv6 addresses of the local host

client.connect((err) =>{ // Connect to the Database
   if (err) {
      console.log(err)  
     }
  else { 
    console.log("Data logging initialised");
   } 
});  

app.get("/", (req, res) =>{
    res.status(200).send("Sever Initialized and Online. Ready to take OFF!");
}); 

app.use("/api", company); 
app.use("/api", signin); 
app.use("/api",users);
app.use("/api",portfolio); 
app.use("/api",reset)



app.listen(port, process.env.baseURL , () => {  
   console.log(`Here we go , All Engines started at ${port}.`) 
})
 

