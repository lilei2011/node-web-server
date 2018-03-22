const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;//work with heroku enviorenment 

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

//log middleware
app.use((req, res, next) => { // express middleware
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;//save this to a file
	console.log(log);

	fs.appendFile('server.log', log+'\n', (err) => {
		if(err){
			console.log("can't save data");
		}
	});
	next();//this one is required
});

//maintenance middleware
// app.use(function(req, res, next){
// 	res.render('maintenance.hbs'); // notice no next() is used, since we want to stop any future function from executing
// })

app.use(express.static(__dirname + '/public'));//express middleware

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// app.get("/", (req, res) => {

// 	//res.send("<h1>hello express</h1>");
// 	res.send({
// 		name:"Lei",
// 		likes: ["biking", "swimming"]
// 	})
// });

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/', (req, res) => {

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: "welcome to the page"
	});
});

// app.get('/bad', (req, res) => {
// 	res.send({
// 		errorMessage:"bad request"});
// })

app.listen(port, () => {
	console.log("server is up")
});