var mysql = require("mysql");
var express = require('express');
var app = express();

//you need this to be able to process information sent to a POST route
	var bodyParser = require('body-parser');

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	// parse application/json
	app.use(bodyParser.json());

var path = require("path");

// Serve static content for the app from the "public" directory in the application directory.
// you need this line here so you don't have to create a route for every single file in the public folder (css, js, image, etc)
//index.html in the public folder will over ride the root route
app.use(express.static("public"));

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "orchids_db"
});

app.get('/orchids', function(req, res){

  connection.query('SELECT * FROM orchids', function (error, results, fields) {
    if (error) throw error;
    
    res.json(results);
  });

});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, "public/orchid-table.html"));
});

app.post('/create', function(req, res){
	console.log(req.body);


	var query = connection.query(
	  "INSERT INTO Genus SET ?",
	  req.body.Genus,
	  function(err, response) {
	    res.redirect('/');
	  }
	);
})

app.listen(3000, function(){
	console.log('listening on 3000');
});