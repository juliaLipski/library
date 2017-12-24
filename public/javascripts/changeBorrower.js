angular.module('angularModule').component("changeBorrower", {
    templateUrl: "./component/changeBorrower.html",
    controller: function ($scope, $http, $timeout, $rootScope, $state) {
        var self = this;
        this.showMessDetete = false;
        this.showMessEddit = false;
        this.messSucses = false;
        this.messNotExist = false;
        this.showMessDeteteBook = false;
       
        this.closeSuc = function (){
            this.messSucses = false;
        }
        this.getborrower = function () {
           self.setData()
           
        }
        this.deleteBook = function (){
            console.log(this.brBooks)
            console.log(this.brBookssplice(this.$index, 1))
            console.log(this._id)                        
            this.brBooks.splice(this.$index, 1);
             var data = {
                _id: this._id,
                brBooks: this.brBooks
            };
           
            $http.put("/api/borrowers/" + data.id, data)
                .then(function (response) {
                    self.showMessDeteteBook = false;
                    self.messSucses = true;
                    self.id = "";
                    self.firstname = "";
                    self.lastname = "";
                    self.email = "";
                    self.phone = "";
                    self.address = "";
                    self.brBooks = "";
                },
                function (response) {
                    console.log("no!!!");
                });

        }
        this.showMessDlBook = function(){
            this.showMessDeteteBook = true;
        }
        this.showMessEd = function () {
            this.showMessEddit = true;
        }
        this.showMessDl = function () {
            this.showMessDetete = true;
        }
        this.close = function () {
            this.showMessDetete = false;
            this.showMessEddit = false;
            this.messNotExist = false;
            this.showMessDeteteBook = false;
        }
        this.deleteBorrower = function () {
            $http.delete("/api/borrowers/" + this.id)
                .then(function (response) {
                     self.setData()
                    self.showMessDetete = false;
                    self.messSucses = true;
                    // self.id = "";
                    // self.firstname = "";
                    // self.lastname = "";
                    // self.email = "";
                    // self.phone = "";
                    // self.address = "";
                    // self.brBooks = "";
                },
                function (response) {
                    console.log("no!!!");
                });
        }


        this.eddit = function () {
            var data = {
                id: this.id,
                name: { firstname: this.firstname, lastname: this.lastname },
                email: this.email,
                phone: this.phone,
                address: this.address
            };
            $http.put("/api/borrowers/" + data.id, data)
                .then(function (response) {
                    self.setData()
                    self.showMessEddit = false;
                    self.messSucses = true;
                },
                function (response) {
                    console.log("no!!!");
                });
        }
        this.setData = function (){
                 $http.get("/api/borrowers/search/" + this.data)
                .then(function (response) {
                    if (response.data[0] == undefined) {
                        self.messNotExist = true;
                    } else {
                         self.showBorrower = true;
                        self.id = response.data[0]._id;
                        self.firstname = response.data[0].name.firstname;
                        self.lastname = response.data[0].name.lastname;
                        self.email = response.data[0].email;
                        self.phone = response.data[0].phone;
                        self.address = response.data[0].address;
                        self.brBooks = response.data[0].brBooks;
                    }
                },
                function (response) {
                    console.log("no!!!");
                });
        }
    }
})