angular.module('angularModule')
    .component("booroweredBook", {
        templateUrl: "./component/changeBorrowersBooks.html",
        controller: function ($http, $rootScope, $state) {
            var self = this;
            var index;
            this.messAdd = false;
            this.messSucses = false;
            this.messDelete = false;

            this.showMessAdd = function () {
                this.messAdd = true;
            }

            this.showMessDlBook = function (ind) {
                this.messDelete = true;
                index = ind;
            }
            this.deleteBook = function () {
                this.messDelete = false;
                var b = this.brbooks[index]
                this.brbooks.splice(index, 1)
                var data = {
                    id: this.id,
                    brBooks: this.brbooks,
                };
                console.log(this.brbooks)
                $http.put("/api/borrowers/" + data.id, data)
                    .then(function (response) {
                        self.changeStatus('available', b)
                        self.messSucses = true;
                    },
                    function (response) {
                        console.log("no!!!");
                    });
            }

            this.addBook = function () {
                this.messAdd = false;
                self.checkBookInBooks();
            }

            this.pushBooks = function () {
                var data = {
                    idBr: this.bookId,
                    id: this.id
                }
                $http.put("/api/borrowers/addBook/" + data.id, data)
                    .then(function (response) {
                        self.changeStatus('borrowed', self.bookId);
                        self.brbooks.push(self.bookId);

                    },
                    function (response) {
                        console.log("no!!!");
                    });
            }

            this.changeStatus = function (statusB, bookId) {
                var data = {
                    id: bookId,
                    status: statusB,
                    lastBorrower: this.id,
                }
                $http.put("/api/books/changeStatus/" + data.id, data)
                    .then(function (response) {
                        self.messSucses = true;
                        this.bookId = "";
                    },
                    function (response) {
                        console.log("no!!!");
                    });
            }
            this.checkAddBookCondition = function (response) {
                var ifExistBorrower = response.filter(function (copiesFromGet) {
                    return (copiesFromGet.lastBorrower == self.id);
                });
                if (this.brbooks.length > 4 || ifExistBorrower.length != 0) {
                    self.messNotPossibly = true;
                } else {
                    self.pushBooks()
                }



            }
            this.checkBookInBooks = function () {

                $http.get("/api/books/getCopy/" + this.bookId)
                    .then(function (response) {
                        self.checkAddBookCondition(response.data)

                    },
                    function (response) {
                        console.log("no!!!");
                    });

            }

            this.close = function () {
                this.messSucses = false;
                this.messDelete = false;
                this.messAdd = false;
                this.messNotPossibly = false;
                $state.go('booroweredBook')
            }

        },
        bindings: {
            id: '=',
            brbooks: '='
        }
    })