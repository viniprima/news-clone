//This is a very basic app to add posts, upvote posts
var app = angular.module('flapperNews', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})

		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		})

		$urlRouterProvider.otherwise('home');
	}]);

//This is our main controller so we have to use the service in the main controller

app.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts){
		$scope.posts = posts.posts;

		$scope.addPost = function(){
			if(!$scope.title || $scope.title === '') { return; }
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 0,
				comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				]
			});
			$scope.title = '';
			$scope.link = '';
		};

	}]);


//This is the posts controller

app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
    //This will be the id of the post
		$scope.post = posts.posts[$stateParams.id];
		//Adding comments to your post
		$scope.addComment = function(){
			if($scope.body === '') { return; }
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
		};

	}]);




app.factory('posts',[function(){
	var o = {
		posts: []
	};
	return o;

}]);