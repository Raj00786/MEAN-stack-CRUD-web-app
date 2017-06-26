angular.module('userApp', ['appRoutes', 'userControllers','mainControllers','authService'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});