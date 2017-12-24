angular.module('angularModule').component("addBook", {
    templateUrl: "./component/addBook.html",
    controller: function ($http, $rootScope, $state) {
        var self = this;

        this.showMessFunc = function () {
            if (!this.ISBN || !this.title || !this.price) {
                this.messInput = true;
            } else {
                console.log(this.ISBN)
                this.showMess = true;
            }
        }
        this.close = function () {
            this.showMess = false;
            this.messOk = false;
            this.messInput = false;
        }
        this.save = function () {
            var data = {
                ISBN: this.ISBN,
                title: this.title,
                author: this.author.split(','),
                genre: this.genre.split(','),
                price: this.price,
            }

            $http.post("/api/books/", data).
                then(function (response) {
                    self.messOk = true;
                    self.title = "";
                    self.author = "";
                    self.genre = "";
                    self.price = "";
                    console.log(data);
                }, function (response) {
                    console.log("no!!!");
                });
        }
    }
})

