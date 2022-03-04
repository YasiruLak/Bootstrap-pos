

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

var tableRow;
$("#btnAddToCart").click(function (){



    var duplicate = false;
    /* for (let i = 0; 1 < $("#addToCartTable tr").length; i++) {
         if ($("#orderItemCmb option:selected").text() == $("#addToCartTable tr").children(":nth-child(1)")[i].innerHTML) {
             duplicate = true;
         }
     }*/
    for (var i = 0; i < $("#addToCartTable tr").length; i++) {
        if($("#orderItemCmb option:selected").text()==$("#addToCartTable tr").children(':nth-child(1)')[i].innerText){
            duplicate=true;
        }
    }

    if (duplicate != true) {
        loadOrderDetail();
        minusQty($("#txtOrderItemNumQty").val());
    }else if (duplicate == true){
        manageQuantity(tableRow.children(':nth-child(4)').text(),$("#txtOrderItemNumQty").val());
        $(tableRow).children(':nth-child(4)').text($("#txtOrderItemNumQty").val());

    }
    // clearItemData();

    $("#addToCartTable>tr").click('click',function () {
        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let unitPrice = $(this).children(":eq(1)").text();
        let discount = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();

        $("#orderItemCmb").val(itemCode);
        // $("#txtOrderItemName").val(cusName1);
        // $("#txtOrderItemAvailableQty").val(cusAddress1);
        $("#txtOrderItemPrice").val(unitPrice);
        $("#txtOrderItemNumQty").val(qty);
        $("#txtOrderDiscount").val(discount);



    });

});

function manageQuantity(prevQty,nowQty){
    var prevQty = parseInt(prevQty);
    var nowQty = parseInt(nowQty);
    var avilbleQty = parseInt($("#txtOrderItemAvailableQty").val());

    avilbleQty = avilbleQty + prevQty;
    avilbleQty = avilbleQty - nowQty;

    $("#txtOrderItemAvailableQty").val(avilbleQty);

}

function minusQty(orderQty){
    var minusQty = parseInt(orderQty);
    var manageQty = parseInt($("#txtOrderItemAvailableQty").val());

    manageQty = manageQty - minusQty;

    $("#txtOrderItemAvailableQty").val(manageQty);
}

// function clearItemData() {
//     $('#orderItemCmb,#txtOrderItemName,#txtOrderItemAvailableQty,#txtOrderItemPrice,#txtOrderItemNumQty,#txtOrderDiscount').val("");
// }

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
    // cash = $("#cash").val();

    // let availableQty = itemQty - itemOrderQty;
    // $("#orderQtyOnHand").val(availableQty);
    // total = itemOrderQty * itemPrice;

    // $("#totalPrice").val(itemOrderQty * itemPrice);

    let total;
    let discount;

    total = itemPrice * itemOrderQty;
    discount = (total / 100) * itemDiscount;
    total = total - discount;


    $("#addToCartTable").append("<tr>" +
        "<td>" + itemCode + "</td>" +
        "<td>" + itemPrice + "</td>" +
        "<td>" + discount + "</td>" +
        "<td>" + itemOrderQty + "</td>" +
        "<td>" + total + "</td>" +
        "</tr>");
}

$("#btnPlaceOrder").click(function (){

    // generateOrderID();
    // clearItemData();
    clearCustomerData();
    placeOrder();

});

function placeOrder(){
    let oid = $("#txtOrderId").val();
    let cId = $("#orderCusCmb").val();
    let oDate = $("#orderDate").val();
    let total = $("#txtOrderTotal").val();

    orderDB.push(new OrderDTO(oid, cId, oDate, total));
    pushOrderDetail();
    generateOrderID();

    console.log("1");

    // generateOrderID();
}

function pushOrderDetail(){
    for (let i = 0; i < $("#addToCartTable tr").length; i++){
        var orderDetail = new OrderDetailDTO($("#txtOrderId").val(),
            $("#addToCartTable tr").children(':nth-child(1)')[i].innerText,
            $("#addToCartTable tr").children(':nth-child(4)')[i].innerText,
            $("#addToCartTable tr").children(':nth-child(5)')[i].innerText)

        orderDetailDB.push(orderDetail);
    }
}




