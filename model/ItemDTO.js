function ItemDTO(id,name,qty,unitPrice){
    this.__id = id;
    this.__name = name;
    this.__qty = qty;
    this.__unitPrice = unitPrice;

    this.getIid = function () {
        return this.__id;
    }
    this.setIid = function (id) {
        this.__id = id;
    }

    this.getName = function () {
        return this.__name;
    }
    this.setName = function (name) {
        this.__name = name;
    }

    this.getQty = function () {
        return this.__qty;
    }
    this.setQty = function (qty) {
        this.qty = qty;
    }

    this.getPrice = function () {
        return this.__unitPrice;
    }
    this.setPrice = function (unitPrice) {
        this.__unitPrice = unitPrice;
    }
}

