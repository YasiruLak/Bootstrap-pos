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
    console.log("1");
    let cusId = $("#orderCusCmb").val();
    let cusName = $("#txtOrderCusName").val();

    for (var i = 0; i < customerDB.length; i++) {
        console.log("2");
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
    console.log("1");
    let itemCode = $("#orderItemCmb").val();
    let itemName = $("#txtOrderCusName").val();
    let itemQty = $("#txtOrderCusName").val();
    let itemPrice = $("#txtOrderCusName").val();

    for (var i = 0; i < itemDB.length; i++) {
        console.log("2");
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
    $("#addToCartTable").empty();

});



