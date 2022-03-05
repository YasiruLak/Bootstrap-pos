function OrderDetailDTO(orderId, orderDate,customerId,customerName, itemCode, itemName, orderQty,discount, totalItemPrice) {
    this.__oid = orderId;
    this.__date = orderDate;
    this.__cusId = customerId;
    this.__cusName = customerName;
    this.__code = itemCode;
    this.__name = itemName;
    this.__qty = orderQty;
    this.__discount = discount;
    this.__totalItemPrice = totalItemPrice;

    this.getOrderId = function () {
        return this.__oid;
    }
    this.setOrderId = function (orderId) {
        this.__oid = orderId;
    }

    this.getOrderDate = function () {
        return this.__date;
    }
    this.setOrderDate = function (orderDate) {
        this.__date = orderDate;
    }
    this.getCusId = function () {
        return this.__cusId;
    }
    this.setCusId = function (customerId) {
        this.__cusId = customerId;
    }
    this.getCusName = function () {
        return this.__cusName;
    }
    this.setCusName = function (customerName) {
        this.__cusName = customerName;
    }

    this.getItemCode = function () {
        return this.__code;
    }
    this.setItemCode = function (itemCode) {
        this.__code = itemCode;
    }

    this.getItemName = function () {
        return this.__name;
    }
    this.setItemName = function (itemName) {
        this.__name = itemName;
    }

    this.getItemQty = function () {
        return this.__qty;
    }
    this.setItemQty = function (orderQty) {
        this.__qty = orderQty;
    }

    this.getDiscount = function () {
        return this.__discount;
    }
    this.setDiscount = function (discount) {
        this.__discount = discount;
    }

    this.getTotAmount = function () {
        return this.__totalItemPrice;
    }
    this.setTotAmount = function (totalItemPrice) {
        this.__totalItemPrice = totalItemPrice;
    }
}