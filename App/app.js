var app=angular.module('app',['ngRoute']);



app.config(function($routeProvider){
    $routeProvider
        .when('/',{controller:'sampleController',templateUrl:"App/Partials/home.html"})
        .when('/home/:num',{controller:'sampleController',templateUrl:"App/Partials/home.html"})
        .otherwise({redirectTo:'/'});
});



app.controller('sampleController',function($scope,$http,$routeParams){
   if($routeParams.num!=null){
        $scope.itemPerPage=$routeParams.num;
    }
    else{
        $scope.itemPerPage=500;
    }

    $scope.currentPage=1;

    $scope.pages=[];

    function init(){
        $http.get('http://jsonplaceholder.typicode.com/photos')
            .success(function(data){
                $scope.photos=data;
                $scope.filteredPhotos=$scope.photos.slice(0, $scope.itemPerPage);

                var totalPage = $scope.photos.length/$scope.itemPerPage;
                for (var i = 1; i <= totalPage; i++) {
                    $scope.pages[i-1]=i;
                }
            })
            .error(function(error){console.log('error occurred')});
    }

    $scope.getRecordsByPage=function(pageNumber){
        var currentIndex = pageNumber *  $scope.itemPerPage -  $scope.itemPerPage;
        var lastIndex = currentIndex + $scope.itemPerPage;
        $scope.filteredPhotos=$scope.photos.slice(currentIndex, lastIndex);
    }

    $scope.prePage=function(){
        $scope.currentPage--;
        $scope.getRecordsByPage($scope.currentPage);
    }

    $scope.nextPage=function(){
        $scope.currentPage++;
        $scope.getRecordsByPage($scope.currentPage);
    }


    init();

});