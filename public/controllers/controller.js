var myTaskListApp = angular.module('TaskListApp', []);
myTaskListApp.controller('AppCtrl', function ($scope, $http) {
	console.log("Controller test");
	var refresh=function(){
		$http.get('/tasklist').success(function(response){
		console.log("Got data requested");
		$scope.tasklist=response;
		$scope.task="";
	});
	};
	refresh();
	$scope.addTask=function(){
		console.log($scope.task);
		$http.post('/tasklist',$scope.task).success(function(response){
			console.log(response);
			refresh();
		});
	};

$scope.RemoveTask=function(id){
	console.log(id);
	$http.delete('/tasklist/'+id).success(function(response){
		refresh();
	});
};
$scope.EditTask=function(id){
	console.log(id);
	$http.get('/tasklist/'+id).success(function(response){
		$scope.task=response;
	});
};
$scope.update=function(){
	console.log($scope.task._id);
	console.log($scope.task);
	$http.put('/tasklist/'+$scope.task._id, $scope.task).success(function(response){
		refresh();
	});
	
};
$scope.deselect=function(){
$scope.task="";	
};
	
});