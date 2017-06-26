angular.module('mainControllers',['authService'])

.controller('mainCtrl',function($http,$location,$timeout,Auth,$rootScope,$window){	
	var app =this;
	$rootScope.$on('$routeChangeStart',function(){
		if(Auth.isLoggedIn()){
			console.log('logged in');
			app.isLogged = true;
			Auth.getUser().then(function(data){
				console.log(data);
				app.username = data.data.username;
				app.email =  data.data.email
			});
		}
		else{
			console.log('user is not logged');
			app.isLogged = false;
			app.username='';
		}
		if($location.hash()=='_=_') $location.hash(null);
	});

	app.facebook = function(){
		$window.location = $window.location.protocol+'//'+$window.location.host+'/auth/faceboook';
	}

	app.logUser = function(data){
		app.loading=true;
		app.successMsg=false;
		app.errorMsg =false;
		Auth.login(app.data).then(function(result){
			console.log(result);
			if(result.data.success){
				app.loading=false;
				app.successMsg = result.data.message+' redirecting to homepage...............';
				$timeout(function(){$location.path('/');app.data='';app.successMsg=false;app.errorMsg =false;}, 2000);
			}else{
				app.loading=false;
				app.errorMsg = result.data.message;
			}
			console.log(result.data.message);
		});
	}

	app.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){$location.path('/');}, 2000);
	};
});