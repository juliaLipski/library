angular.module('angularModule').component("changeBook", {
    templateUrl: "./component/changeBook.html",
    controller: function ($scope, $http, $rootScope, $state) {
        var self = this;
        this.messDetete = false;
        this.copyIndex;

        this.showMessDlAllCopies = function () {
            this.messDelete = true;
        }

        this.getBook = function () {
            self.checkData()
        }

        this.close = function () {
            this.messDelete = false;
            this.messNotExist = false;
            this.modalChangeStatus = false;
        }
        this.closeSuc = function () {
            this.messSucses = false;
            $state.go('changeBook')
        }
        this.showChangeStatus = function (inx) {
            this.copyIndex = inx;
            this.modalChangeStatus = true;
        }
        this.setNewStatus = function () {
            console.log(this.newStatus)
            console.log(this.copies[this.copyIndex].lastBorrower)
            this.modalChangeStatus = false;
            var data = {
                id: this.copies[this.copyIndex]._id,
                lastBorrower: this.copies[this.copyIndex].lastBorrower,
                status: this.newStatus
            };
            $http.put("/api/books/changeStatus/" + data.id, data)
                .then(function (response) {
                    self.checkData()
                    self.messSucses = true;
                },
                function (response) {
                    console.log("no!!!");
                });

        }


        this.deleteAllCopies = function () {
            this.messDetete = false;
            $http.delete("/api/books/deleteAll/" + this.ISBN)
                .then(function (response) {
                    self.checkData()
                    self.messSucses = true;
                },
                function (response) {
                    console.log("no!!!");
                });
        }
        this.checkData = function () {
            $http.get("/api/books/search/" + this.data)
                .then(function (response) {
                    if (response.data[0] == undefined) {
                        console.log(9)
                        self.messNotExist = true;
                    } else {
                        self.showBook = true;
                        self.ISBN = response.data[0].ISBN;
                        self.title = response.data[0].title;
                        self.author = response.data[0].author;
                        self.genre = response.data[0].genre;
                        self.price = response.data[0].price;
                        self.copies = response.data[0].copies;
                        console.log(self.copies)
                    }
                },
                function (response) {
                    console.log("no!!!");
                });

        }
    }
})