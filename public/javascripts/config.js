angular.module('angularModule', ['ui.router']).config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider,
        $urlRouterProvider) {
        $stateProvider
            .state({
                name: "home",
                url: "/",
                component: "home",
                authenticate: true
            })
            .state({
                name: "edditBook",
                url: "/edditBook",
                params: { params: null },
                component: "edditBook",
                authenticate: true

            })
            .state({
                name: "addBook",
                url: "/addBook",
                component: "addBook",
                authenticate: true

            })
            .state({
                name: "changeBook",
                url: "/changeBook",
                component: "changeBook",
                authenticate: true
            })
            .state({
                name: "addBorrower",
                url: "/addBorrower",
                component: "addBorrower",
                authenticate: true

            })
            .state({
                name: "changeBorrower",
                url: "/changeBorrower",
                component: "changeBorrower",
                authenticate: true

            })
            .state({
                name: "info",
                url: "/info",
                component: "info",
                authenticate: true
            })
            .state({
                name: "error",
                url: "/error",
                component: "error",
                authenticate: true
            })
        $urlRouterProvider.otherwise('/');
    }])
    // .factory('dataFactory', function ($http) {
    //     var service = {};
    //     service.getData = function () {
    //       return  $http.get("/data")
    //     };

    //     return service;

    // });
