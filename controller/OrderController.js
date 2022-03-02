function setCurrentDate(){
    let orderDate = $('#orderDate');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    orderDate.val(today);
}

function generateOrderID() {
    try {
        let lastOrderId = orderDB[orderDB.length-1].getOid();
        let newOrderId = parseInt(lastOrderId.substring(1,4))+1;
        if (newOrderId < 10) {
            $("#txtOrderId").val("D00-00"+newOrderId);
        }else if (newOrderId < 100) {
            $("#txtOrderId").val("D00-0"+newOrderId);
        } else {
            $("#txtOrderId").val("D00-"+newOrderId);
        }
    } catch (e) {
        $("#txtOrderId").val("D00-001");
    }

}
generateOrderID();

function loadCustomerComboBoxData(value) {
    $("#orderCusCmb").append(value);
}

$("#orderCusCmb").click(function () {
    let cusId = $("#orderCusCmb").val();
    let cusName = $("#txtOrderCusName").val();

    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCid() == cusId) {
            cusName = customerDB[i].getName();

            $("#txtOrderCusName").val(cusName);

        }
    }
});

function loadItemComboBoxData(value) {
    $("#orderItemCmb").append(value);
}

$("#orderItemCmb").click(function () {
    let itemCode = $("#orderItemCmb").val();
    let itemName = $("#txtOrderCusName").val();
    let itemQty = $("#txtOrderCusName").val();
    let itemPrice = $("#txtOrderCusName").val();

    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getIid() == itemCode) {
            itemName = itemDB[i].getName();
            itemQty = itemDB[i].getQty();
            itemPrice = itemDB[i].getPrice();

            $("#txtOrderItemName").val(itemName);
            $("#txtOrderItemAvailableQty").val(itemQty);
            $("#txtOrderItemPrice").val(itemPrice);

        }
    }
});

$("#btnAddToCart").click(function (){
    loadOrderDetail();

});

let itemPrice;
let itemQty;
let itemOrderQty;
let itemDiscount;

function loadOrderDetail() {
    $("#addToCartTable").empty();

    // itemCode = $("#orderItemCmb").val();
    // itemName = $("#txtOrderItemName").val();
    itemPrice = $("#txtOrderItemPrice").val();
    itemQty = $("#txtOrderItemAvailableQty").val();
    itemOrderQty = $("#txtOrderItemNumQty").val();
    itemDiscount = $("#txtOrderDiscount").val();
    // cash = $("#cash").val();

    // let availableQty = itemQty - itemOrderQty;
    // $("#orderQtyOnHand").val(availableQty);
    // total = itemOrderQty * itemPrice;

    // $("#totalPrice").val(itemOrderQty * itemPrice);

    let total;
    let discount;

    total = itemPrice * itemOrderQty;
    discount = (total/100)*itemDiscount;
    total = total-discount;


    for (let i = 0; i < itemDB.length; i++){
        $("#addToCartTable").append("<tr>" +
            "<td>"+itemDB[i].getIid()+"</td>" +
            // "<td>"+itemDB[i].getName()+"</td>" +
            "<td>"+itemDB[i].getPrice()+"</td>" +
            "<td>"+discount+"</td>" +
            "<td>"+itemOrderQty+"</td>" +
            "<td>"+total+"</td>" +
            "</tr>");
    }

}

$("#btnPlaceOrder").click(function (){
    let oid = $("#txtOrderId").val();
    let cId = $("#orderCusCmb").val();
    let oDate = $("#orderDate").val();
    let total = $("#txtOrderTotal").val();

    orderDB.push(new OrderDTO(oid,cId,oDate,total));

    console.log("1");

    generateOrderID();
});




