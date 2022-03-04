function OrderDetailDTO(orderId, itemCode, orderQty, totalItemPrice) {
    this.__oid = orderId;
    this.__code = itemCode;
    this.__qty = orderQty;
    this.__totalItemPrice = totalItemPrice;

    this.getOrderId = function () {
        return this.__oid;
    }
    this.setOrderId = function (orderId) {
        this.__oid = orderId;
    }

    this.getItemCode = function () {
        return this.__code;
    }
    this.setItemCode = function (itemCode) {
        this.__code = itemCode;
    }

    this.getItemQty = function () {
        return this.__qty;
    }
    this.setItemQty = function (orderQty) {
        this.__qty = orderQty;
    }

    this.getTotAmount = function () {
        return this.__totalItemPrice;
    }
    this.setTotAmount = function (totalItemPrice) {
        this.__totalItemPrice = totalItemPrice;
    }
}