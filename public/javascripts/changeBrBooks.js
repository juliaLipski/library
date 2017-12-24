angular.module('angularModule').component("changeBrBooks", {
    templateUrl: "./component/changeBrBooks.html",
    controller: function ($http, $rootScope, $state) {
        this.getborrower = function () {
            $http.get("/api/borrowers/search/" + this.data)
                .then(function (response) {
                    console.log(self.borrowers)
                    self.borrowers = response.data;
                    self.brBooks = response.data[0].brBooks;
                },
                function (response) {
                    console.log("no!!!");
                });
        }
    }
})
