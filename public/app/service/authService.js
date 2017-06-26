angular.module('authService',[])


.factory('Auth',function($http,AuthToken){
	var authFactory = {};

	//AuthToken.login()
	authFactory.login = function(data){
		return $http.post('/api/authenticate',data).then(function(result){
			AuthToken.setToken(result.data.token);
			return result
		});
	}

	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken()){
			return true;
		}
		else{
			return false;
		}
	}

	//Auth.facebook()
	authFactory.facebook = function(token){
		console.log(token);
		AuthToken.setToken(token);
	};

	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return $http.post('/api/me');
		}else{
			$q.reject({message:'no token present'});
		}
	};

	authFactory.logout = function(){
		AuthToken.setToken();
	};

	return authFactory;
})

.factory('AuthToken',function($window){
	var authTokenFactory = {};

	//AuthToken.setToken()
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token',token);
		}else{
			$window.localStorage.removeItem('token');
		}
	}
	
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	}

	return authTokenFactory;
})

.factory("AuthInterceptors",function(AuthToken){
	var authInterceptors = {};

	authInterceptors.request = function(config){
		var token = AuthToken.getToken();
		console.log("tkoek:"+token);
		if(token) config.headers['x-access-token'] = token;
		return config;
	}

	return authInterceptors;
})

;