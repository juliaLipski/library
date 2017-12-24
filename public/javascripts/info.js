angular.module('angularModule').component("info", {
    templateUrl: "./component/info.html",
    controller: function ($scope, $http, $timeout, $rootScope, $state) {
        var self = this;
        this.$onInit = function () {
            self.getActiveBorrowers()
            self.getBrBooks()
            self.getLostBooks();

        };
        this.showborroweredBooks = function () {
            this.borroweredBooks = true;
            this.lostBooks = false;
            this.showBorrowers = false;
        }

        this.showlostBooks = function () {
            this.lostBooks = true;
            this.borroweredBooks = false;
            this.showBorrowers = false;
        }

        this.activeBorrovers = function () {
            this.showBorrowers = true;
            this.borroweredBooks = false;
            this.lostBooks = false;
        }

        this.getLostBooks = function () {
            $http.get("/api/books/getBooksByStatus/" + "lost")
                .then(function (response) {
                    self.dataLost = response.data;
                    self.lBooks = response.data.length;
                    console.log(response.data.length)
                },
                function (response) {
                    console.log("no!!!");
                });
        }
        this.getBrBooks = function () {
            $http.get("/api/books/getBooksByStatus/" + "borrowed")
                .then(function (response) {
                    self.data = response.data;
                    self.brBooks = response.data.length;
                    console.log(response.data.length)
                },
                function (response) {
                    console.log("no!!!");
                });
        }

        this.getActiveBorrowers = function () {
            $http.get("api/borrowers/getActive/")
                .then(function (response) {
                    self.dataActBorr = response.data;
                    self.actBorr = response.data.length;
                    console.log(response)
                },
                function (response) {
                    console.log("no!!!");
                });
        }

    }
})