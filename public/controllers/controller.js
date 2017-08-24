angular.module("Contacts", []).controller("AppCtrl", AppCtrlFunc)

function AppCtrlFunc($scope, $http) {
    console.log("hello world");

    var refresh = function () {

        $http.get('/contactlist').then(function (response) {
            console.log("I got the data i requested");
            $scope.contactlist = response.data;
            $scope.contact = null;
        });
    };

    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).then(function (response) {
            console.log(response.data);
            refresh();
        });
    };

    $scope.delete = function (id) {
        console.log(id);
        $http.delete('/contactlist/' + id).then(function (response) {
            refresh();
        });

    };

    $scope.edit = function(id){
        console.log(id);
        $http.get('/contactlist/' + id).then(function (response) {
            $scope.contact = response.data;
        });
    };

    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response){
            refresh();
        });
    };

    $scope.deselect = function(){
        $scope.contact = null;
    }
}
