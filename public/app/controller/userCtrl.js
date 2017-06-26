angular.module('userControllers',[])

.controller('regCtrl',function($http,$location,$timeout){	
	var app =this;

	app.regUser = function(data){
		app.loading=true;
		app.successMsg=false;
		app.errorMsg =false;
		$http.post('/api/users',this.data).then(function(result){
			if(result.data.success){
				app.loading=false;
				app.successMsg = result.data.message+' redirecting to homepage...............';
				$timeout(function(){$location.path('/');}, 2000);
			}else{
				app.loading=false;
				app.errorMsg = result.data.message;
			}
			console.log(result.data.message);
		});
	}
})

.controller('facebookCtrl',function($window,$routeParams,Auth,$location){
	var app = this;

	if($window.location.pathname=='/facebookerror'){
		app.errorMsg = 'Email linked with facebook not found. Please register again Thank you';
	}
	else{
		Auth.facebook($routeParams.token);
		$location.path('/');
	}
});