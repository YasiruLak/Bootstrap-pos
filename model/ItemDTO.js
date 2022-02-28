function ItemDTO(itemCode,itemName,itemQty,itemUnitPrice){
    this.__id = itemCode;
    this.__name = itemName;
    this.__qty = itemQty;
    this.__unitPrice = itemUnitPrice;

    this.getIid = function () {
        return this.__id;
    }
    this.setIid = function (itemCode) {
        this.__id = itemCode;
    }

    this.getName = function () {
        return this.__name;
    }
    this.setName = function (itemName) {
        this.__name = itemName;
    }

    this.getQty = function () {
        return this.__qty;
    }
    this.setQty = function (itemQty) {
        this.qty = itemQty;
    }

    this.getPrice = function () {
        return this.__unitPrice;
    }
    this.setPrice = function (itemUnitPrice) {
        this.__unitPrice = itemUnitPrice;
    }
}

