var express  		= require('express');
var router 			= express.Router();
var User 			= require('../models/user')
var jwt				= require('jsonwebtoken')
var secret			='rajkumar'


router.post('/users',function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if(req.body.username==null||req.body.username==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email==''){
		res.json({success:false,message:'Username password and email required'});
	}else{
		user.save(function(err){
			if(err){
				res.json({success:false,message:'User already exist'});
			}else{
				res.json({success:true,message:'User Created'});
			}
		});
	}
});

router.post('/authenticate', function(req,res){
	User.findOne({username:req.body.username}).select('email username password').exec(function(err,user){
		if(err) throw err
		if(!user){
			res.json({success:false,message:'user not exist'});
		}else{
			var valid = user.comparePassword(req.body.password);
			if(!valid){
				res.json({success:false,message:"can't be authenticated"});
			}
			else if(valid){
				var token = jwt.sign({username:user.username, email:user.email},secret,{expiresIn:'24h'});
				res.json({success:true,message:'logging in......',token:token});
			}
			else{
				res.json({success:false,message:'Incorresct password'});				
			}
		}
	});
});

router.use(function(req,res,next){
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if(token){
		jwt.verify(token,secret,function(err,decoded){
			if(err){
				res.json({success:false,message:'token is not valid'})
			}else{
				req.decoded = decoded;	
				next();			
			}
		});	
	}else{
		res.json({success:false,message:'No token provided'});
	}
});

router.post('/me',function(req,res){
	res.send(req.decoded);
});


module.exports = router;