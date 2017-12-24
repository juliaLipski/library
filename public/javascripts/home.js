angular.module('angularModule').component("home", {
    templateUrl: "./component/home.html",
    controller: function ($scope, $http, $timeout, $state) {
        var self = this;

        this.$onInit = function () {
            this.getbooks();
        }

        this.getbooks = function () {
            $http.get("/api/books/")
                .then(function (response) {
                    self.books = response.data;
                },
                function (response) {
                    console.log("no!!!");
                });

        }

        this.edditBook = function (ISBN) {
            //console.log(book);
            $state.go('edditBook', { params: ISBN });


        }
        this.delete = function () {
            this.delMess = false;
            $http.delete("/api/books/:" + self.ISBN)
                .then(function (response) {
                },
                function (response) {
                    console.log("no!!!");
                });
        }

        this.deleteBook = function (ISBN) {
            self.ISBN = ISBN;
            this.delMess = true;
        }

        this.exit = function () {
            this.delMess = false;
        }

    }
})