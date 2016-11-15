const PORT=8080;
const express=require('express');
const app = express();


//Model IntroWebUserLog
var IntroWebUserLog     = require('./models/IntroWebUserLog');

//Body-Parser
//this will let us get the data from a POST
var bodyParser = require('body-parser');

//filestream API: for managing files
var fs =require('fs')

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json());
	

// get an instance of the express Router
var router = express.Router();              

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('');
    console.log('###### Request Triggered ######');

    console.log('From :'+req.url);
    if (req.body !== null) {
    	console.log('With a body content :'+JSON.stringify(req.body));
	}
	console.log('###############################');
    console.log('');

    next(); // make sure we go to the next routes and don't stop here
});

//api health
router.get('/', function(req, res) {
    res.status(200).json({ message: 'Welcome to the Logging API!',Status:"green" });   
});

function replacer(key,value)
{
    if (key=="_id") return undefined;
    else return value;
}

//create Log line comming from IntroMobilePage::Web-User 
router.route('/introwebuserlogs')

    // create a IntroWebUserLog (accessed at POST http://localhost:8080/api/introwebuserlogs)
    .post(function(req, res) {
        
        // create a new instance of the IntroWebUserLog model
        var introWebUserLog = new IntroWebUserLog();     
        // set the introWebUserLog atttributes (comes from the request)
        introWebUserLog.duration = req.body.duration;  
        introWebUserLog.clientId = introWebUserLog._id;  
   if (req.body.gone_to_play_store===true) {
       		introWebUserLog.gone_to_play_store = "clicked on Play-Store button";  
        }else {	
        	introWebUserLog.gone_to_play_store ="left without clicking";
        }

        fs.appendFile('./public/intro-web-user.log',JSON.stringify(introWebUserLog,replacer)+'\n',function(err){
        	if(err){
        		console.log(err);
	        }else{
	        	console.log('file was modified !');
	        }
        });

        res.status(200).json({message: 'IntroWebUserLog instance was created successfuly', IntroWebUserLog: introWebUserLog});

    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(PORT);

console.log('Server Started at port: '+PORT);

