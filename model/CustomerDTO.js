function CustomerDTO(customerID,customerName,customerAddress,customerContact){
    this.__id = customerID;
    this.__name = customerName;
    this.__address = customerAddress;
    this.__contact = customerContact;

    this.getCid = function () {
        return this.__id;
    }
    this.setCid = function (customerID) {
        this.__id = customerID;
    }

    this.getName = function () {
        return this.__name;
    }
    this.setName = function (customerName) {
        this.__name = customerName;
    }

    this.getAddress = function () {
        return this.__address;
    }
    this.setAddress = function (customerAddress) {
        this.__address = customerAddress;
    }

    this.getContact = function () {
        return this.__contact;
    }
    this.setContact = function (customerContact) {
        this.__contact = customerContact;
    }
}