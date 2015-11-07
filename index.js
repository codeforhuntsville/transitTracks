//Getting all dependencies
var express = require('express.io');
var bodyParser = require('body-parser');
var app = express();


app.set('port', (process.env.PORT || 5000));

//Setting directory structure
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded({extended: false }));
app.use( bodyParser.json());

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port ', app.get('port'));
});
