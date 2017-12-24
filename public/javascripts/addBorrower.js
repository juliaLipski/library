angular.module('angularModule').component("addBorrower", {
    templateUrl: "./component/addBorrower.html",
    controller: function ($scope, $http, $timeout, $rootScope, $state) {
        $rootScope.$state = $state;
        var self = this;

        this.getSaveMess = function () {
            if (!this.firstname || !this.lastname || !this.phone) {
                this.messInput = true;
            } else {
                this.saveMess = true;
            }
        }

        this.exit = function () {
            this.saveMess = false;
            this.messInput = false;
        }
        this.close = function () {
            this.messOk = false;
        }

        this.addBorrower = function () {
            this.saveMess = false;
            var bdata = {
                name: { firstname: this.firstname, lastname: this.lastname },
                email: this.email,
                phone: this.phone,
                address: this.address
            };
            console.log(bdata)
            $http.post("/api/borrowers/", bdata)
                .then(function (response) {
                    console.log(response);
                    self.messOk = true;
                    self.firstname = "",
                        self.lastname = "",
                        self.email = "",
                        self.phone = "",
                        self.address = ""
                }, function (response) {
                    console.log("no!!!");
                });
        }
    }
})