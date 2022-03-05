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
    $("#txtOrderId").val("O00-0001");
    var orderId=orderDB[orderDB.length-1].getOrderId();
    var tempId = parseInt(orderId.split("-")[1]);
    tempId = tempId+1;
    if (tempId <= 9){
        $("#txtOrderId").val("O00-000"+tempId);
    }else if (tempId <= 99) {
        $("#txtOrderId").val("O00-00" + tempId);
    }else if (tempId <= 999){
        $("#txtOrderId").val("O00-0" + tempId);
    }else {
        $("#txtOrderId").val("O00-"+tempId);
    }
}

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
    let itemName = $("#txtOrderItemName").val();
    let itemQty = $("#txtOrderItemNumQty").val();
    let itemPrice = $("#txtOrderItemPrice").val();

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

var tableRow;
$("#btnAddToCart").click(function (){

    var duplicate = false;

    for (var i = 0; i < $("#addToCartTable tr").length; i++) {

        if($("#orderItemCmb option:selected").text() == $("#addToCartTable tr").children(':nth-child(1)')[i].innerText){
            duplicate=true;

        }
    }

    if (duplicate != true) {

        loadOrderDetail();
        minusQty($("#txtOrderItemNumQty").val());

    }else if (duplicate == true){

        manageQuantity(tableRow.children(':nth-child(3)').text(),$("#txtOrderItemNumQty").val());
        $(tableRow).children(':nth-child(3)').text($("#txtOrderItemNumQty").val());

    }

    $("#addToCartTable>tr").click('click',function () {
        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let unitPrice = $(this).children(":eq(3)").text();
        let discount = $(this).children(":eq(4)").text();
        let total = $(this).children(":eq(5)").text();

        $("#orderItemCmb").val(itemCode);
        $("#txtOrderItemName").val(itemName);
        $("#txtOrderItemPrice").val(unitPrice);
        $("#txtOrderItemNumQty").val(qty);
        $("#txtOrderDiscount").val(discount);
        $("#total").val(total);

    });

});

function manageQuantity(prevQty,nowQty){
    var prevQty = parseInt(prevQty);
    var nowQty = parseInt(nowQty);
    var availableQty = parseInt($("#txtOrderItemAvailableQty").val());

    availableQty = availableQty + prevQty;
    availableQty = availableQty - nowQty;

    $("#txtOrderItemAvailableQty").val(availableQty);

}

function minusQty(orderQty){
    var minusQty = parseInt(orderQty);
    var manageQty = parseInt($("#txtOrderItemAvailableQty").val());

    manageQty = manageQty - minusQty;

    $("#txtOrderItemAvailableQty").val(manageQty);
}

function clearItemData() {
    $('#orderItemCmb,#txtOrderItemName,#txtOrderItemAvailableQty,#txtOrderItemPrice,#txtOrderItemNumQty,#txtOrderDiscount').val("");
}

function clearCustomerData(){
    $('#orderCusCmb,#txtOrderCusName').val("");
}

var itemCode;
var itemName;
var itemPrice;
var itemQty;
var itemOrderQty;
var itemDiscount;

$("#addToCartTable").empty();
function loadOrderDetail() {

    itemCode = $("#orderItemCmb").val();
    itemName = $("#txtOrderItemName").val();
    itemPrice = $("#txtOrderItemPrice").val();
    itemQty = $("#txtOrderItemAvailableQty").val();
    itemOrderQty = $("#txtOrderItemNumQty").val();
    itemDiscount = $("#txtOrderDiscount").val();

    let total;
    let discount;

    total = itemPrice * itemOrderQty;
    discount = (total / 100) * itemDiscount;
    total = total - discount;


    $("#addToCartTable").append("<tr>" +
        "<td>" + itemCode + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + itemOrderQty + "</td>" +
        "<td>" + itemPrice + "</td>" +
        "<td>" + discount + "</td>" +
        "<td>" + total + "</td>" +
        "</tr>");
}

$("#btnPlaceOrder").click(function (){
    placeOrder();
    pushOrderDetail();
    generateOrderID();
    clearItemData();
    clearCustomerData();
    $("#addToCartTable").empty();

});

function placeOrder(){
    let oid = $("#txtOrderId").val();
    let cId = $("#orderCusCmb").val();
    let oDate = $("#orderDate").val();
    let total = $("#lblTotal").val();

    orderDB.push(new OrderDTO(oid, cId, oDate, total));

}

function pushOrderDetail(){
    for (let i = 0; i < $("#addToCartTable tr").length; i++){
        var orderDetail = new OrderDetailDTO($("#txtOrderId").val(),
            $("#orderDate").val(),
            $("#orderCusCmb").val(),
            $("#txtOrderCusName").val(),
            $("#addToCartTable tr").children(':nth-child(1)')[i].innerText,
            $("#addToCartTable tr").children(':nth-child(2)')[i].innerText,
            $("#addToCartTable tr").children(':nth-child(3)')[i].innerText,
            $("#addToCartTable tr").children(':nth-child(5)')[i].innerText,
            $("#addToCartTable tr").children(':nth-child(6)')[i].innerText)

        orderDetailDB.push(orderDetail);
    }
}




