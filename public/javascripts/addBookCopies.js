angular.module('angularModule')
    .component("addCopies", {
        templateUrl: "./component/addBookCopies.html",
        controller: function ($http, $rootScope, $state) {
            var self = this;
            this.showMessAdd = false;
            this.messOk = false;
            $rootScope.$state = $state;
            this.close = function () {
                this.messOk = false;
            }

            this.showMess = function () {
                this.showMessAdd = true;
            }

            this.exit = function () {
                this.showMess = false;
                $state.go('addBookCopies');
            }
            this.addBookCopies = function () {
                this.showMessAdd = false;
                this.quanOfCopy
                var ISBN = this.isbn;
                console.log(ISBN)
                $http.put("/api/books/addCopy/" + ISBN)
                    .then(function (response) {
                        self.messOk = true;
                        console.log(response);
                    },
                    function (response) {
                        console.log("no!!!");
                    });
            }
        },
        bindings: {
            isbn: '<'
        }
    })

