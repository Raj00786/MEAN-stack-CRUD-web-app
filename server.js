var express 		= require('express')
var morgan 			= require('morgan')
var bodyParser 		= require('body-parser')
var port 			= process.env.PORT||8080
var mongoose 		= require('mongoose')
var app 			= express()
var appRoutes		= require('./app/routes/api')
var path			= require('path')
var passport		=require('passport')
var social			=require('./app/passport/passport')(app,passport)

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);

mongoose.connect('mongodb://localhost/test',function(err){
	if(err){
		console.log('can"t connect to database right now');
	}else{
		console.log('successfully connected to database');
	}
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});


app.listen(port,function(){
	console.log('runnning server on '+port);
});