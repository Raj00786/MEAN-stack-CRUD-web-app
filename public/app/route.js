var app =angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
		templateUrl :'app/views/pages/home.html'
	})
	.when('/about',{
		templateUrl :'app/views/pages/about.html',
		authenticate:false
	})
	.when('/register',{
		templateUrl :'app/views/pages/user/register.html',
		controller:'regCtrl',
		controllerAs:'register',
		authenticate:false
	})
	.when('/login',{
		templateUrl :'app/views/pages/user/login.html',
		authenticate:false		
	})
	.when('/logout',{
		templateUrl :'app/views/pages/user/logout.html',
		authenticate:true
	})
	.when('/profile',{
		templateUrl :'app/views/pages/user/profile.html',
		authenticate:true
	})
	.when('/facebook/:token',{
		templateUrl :'app/views/pages/user/social/social.html',
		controller:'facebookCtrl',
		controllerAs:'facebook',
		authenticate:false
	})
	.when('/facebookerror',{
		templateUrl :'app/views/pages/user/login.html',
		controller:'facebookCtrl',
		controllerAs:'facebook',
		authenticate:false
	})
	.otherwise({
		redirectTo:'/'		
	});

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});

app.run(function($rootScope,Auth,$location){
	$rootScope.$on('$routeChangeStart',function(event ,next,current){
		if(next.$$route.authenticate==true){
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}
		}else if(next.$$route.authenticate==false){
			if(Auth.isLoggedIn()){	
				event.preventDefault();
				$location.path('/profile');
			}
		}else{
			console.log('no authentication req.');
		}
	});
});