//Hide All Content
$("#dashboardContent").css("display", "block");
$("#customerContent").css("display", "none");
$("#itemContent").css("display", "none");
$("#orderContent").css("display", "none");
$("#purchaseOrderContent").css("display", "none");

$("#linkHome").css('color', 'white');
$("#linkCustomer").css('color', 'black');
$("#linkItem").css('color', 'black');
$("#linkOrder").css('color', 'black');
$("#linkPurchaseOrder").css('color', 'black');

$("#linkCustomer").click(function () {
    $("#dashboardContent").css("display", "none");
    $("#customerContent").css("display", "block");
    $("#itemContent").css("display", "none");
    $("#orderContent").css("display", "none");
    $("#purchaseOrderContent").css("display", "none");

    $("#linkHome").css('color', 'black');
    $("#linkCustomer").css('color', 'white');
    $("#linkItem").css('color', 'black');
    $("#linkOrder").css('color', 'black');
    $("#linkPurchaseOrder").css('color', 'black');
});

$("#linkItem").click(function () {
    $("#dashboardContent").css("display", "none");
    $("#customerContent").css("display", "none");
    $("#itemContent").css("display", "block");
    $("#orderContent").css("display", "none");
    $("#purchaseOrderContent").css("display", "none");

    $("#linkHome").css('color', 'black');
    $("#linkCustomer").css('color', 'black');
    $("#linkItem").css('color', 'white');
    $("#linkOrder").css('color', 'black');
    $("#linkPurchaseOrder").css('color', 'black');
});

$("#linkOrder").click(function () {
    $("#dashboardContent").css("display", "none");
    $("#customerContent").css("display", "none");
    $("#itemContent").css("display", "none");
    $("#orderContent").css("display", "block");
    $("#purchaseOrderContent").css("display", "none");

    $("#linkHome").css('color', 'black');
    $("#linkCustomer").css('color', 'black');
    $("#linkItem").css('color', 'black');
    $("#linkOrder").css('color', 'white');
    $("#linkPurchaseOrder").css('color', 'black');
});

$("#linkPurchaseOrder").click(function () {
    $("#dashboardContent").css("display", "none");
    $("#customerContent").css("display", "none");
    $("#itemContent").css("display", "none");
    $("#orderContent").css("display", "none");
    $("#purchaseOrderContent").css("display", "block");

    $("#linkHome").css('color', 'black');
    $("#linkCustomer").css('color', 'black');
    $("#linkItem").css('color', 'black');
    $("#linkOrder").css('color', 'black');
    $("#linkPurchaseOrder").css('color', 'white');
});

$("#linkHome").click(function () {
    $("#dashboardContent").css("display", "block");
    $("#customerContent").css("display", "none");
    $("#itemContent").css("display", "none");
    $("#orderContent").css("display", "none");
    $("#purchaseOrderContent").css("display", "none");

    $("#linkHome").css('color', 'white');
    $("#linkCustomer").css('color', 'black');
    $("#linkItem").css('color', 'black');
    $("#linkOrder").css('color', 'black');
    $("#linkPurchaseOrder").css('color', 'black');
});

$("#btnGoToCustomer").click(function () {
    $("#dashboardContent").css("display", "none");
    $("#customerContent").css("display", "none");
    $("#itemContent").css("display", "none");
    $("#orderContent").css("display", "block");
    $("#purchaseOrderContent").css("display", "none");

    $("#linkHome").css('color', 'black');
    $("#linkCustomer").css('color', 'black');
    $("#linkItem").css('color', 'black');
    $("#linkOrder").css('color', 'white');
    $("#linkPurchaseOrder").css('color', 'black');
});

//Customer Content------------------------------------------------------------------------------------------------------------------

// Events start
$("#btnCustomerSave").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
});

// search customer
$("#btnSearchCustomer").click(function () {
    var searchID = $("#txtSearchCustomer").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCusId").val(response.id);
        $("#txtCusName").val(response.name);
        $("#txtCusAddress").val(response.address);
        $("#txtCusContact").val(response.contact);
    }else{
        clearAll();
        alert("No Such a Customer");
    }
});
// Events end

// CRUD OPERATIONS START
function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.contact}</td></tr>`;
        /*select the table body and append the row */
        $("#customerTable").append(row);
    }
}

function saveCustomer() {
    //gather customer information
    let customerID = $("#txtCusId").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerContact = $("#txtCusContact").val();

    //create Object
    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        contact: customerContact
    };

    customerDB.push(customerObject);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

function deleteCustomer(){
    //write the code
}

function updateCustomer(){
    //write the code
}

// CRUD OPERATIONS ENDED


//validation started
// customer regular expressions
const regExCusId = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{5,20}$/;
const regExCusAddress = /^[0-9/A-z. ,]{7,}$/;
const regExCusContact = /^[0-9]{3}[-]?[0-9]{7}$/;

$('#txtCusId,#txtCusName,#txtCusAddress,#txtCusContact').on('keydown', function (eventOb){
    if (eventOb.key == "Tab"){
        eventOb.preventDefault();
    }
});

$('#txtCusId,#txtCusName,#txtCusAddress,#txtCusContact').on('blur', function (){
    formValid();
});

//focusing events
$("#txtCusId").on('keyup', function (eventOb){
    setButton();
    if (eventOb.key == "Enter"){
        checkIfValid();
    }
    if (eventOb.key == "Control"){
        var typedCustomerID = $("#txtCusId").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtCusId").val(srcCustomer.getCustomerID());
        $("#txtCusName").val(srcCustomer.getCustomerName());
        $("#txtCusAddress").val(srcCustomer.getCustomerAddress());
        $("#txtCusContact").val(srcCustomer.getCustomerContact());
    }
});

$("#txtCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCusContact").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

// focusing events end
$("#btnCustomerSave").attr('disabled', true);

function clearAll(){
    $('#txtCusId,#txtCusName,#txtCusAddress,#txtCusContact').val("");
    $('#txtCusId,#txtCusName,#txtCusAddress,#txtCusContact').css('border', '2px solid #ced4da');
    $('#txtCusId').focus();
    $("#btnCustomerSave").attr('disabled', true);
    loadAllCustomers();
    $("#lblCusId,#lblCusName,#lblCusAddress,#lblCusContact").text("");
}

function formValid() {
    var cusID = $("#txtCusId").val();
    $("#txtCusId").css('border', '2px solid green');
    $("#lblCusId").text("");
    if (regExCusId.test(cusID)) {
        var cusName = $("#txtCusName").val();
        if (regExCusName.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblCusName").text("");
            var cusAddress = $("#txtCusAddress").val();
            if (regExCusAddress.test(cusAddress)) {
                var cusContact = $("#txtCusContact").val();
                var resp = regExCusContact.test(cusContact);
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblCusAddress").text("");
                if (resp) {
                    $("#txtCusContact").css('border', '2px solid green');
                    $("#lblCusContact").text("");
                    return true;
                } else {
                    $("#txtCusContact").css('border', '2px solid red');
                    $("#lblCusContact").text("Cus Contact is a required field : Pattern 076-8383493");
                    return false;
                }
            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblCusAddress").text("Cus Name is a required field : Minimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblCusName").text("Cus Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusId").css('border', '2px solid red');
        $("#lblCusId").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtCusId").val();
    if (regExCusId.test(cusID)) {
        $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (regExCusName.test(cusName)) {
            $("#txtCusAddress").focus();
            var cusAddress = $("#txtCusAddress").val();
            if (regExCusAddress.test(cusAddress)) {
                $("#txtCusContact").focus();
                var cusContact = $("#txtCusContact").val();
                var resp = regExCusContact.test(cusContact);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtCusContact").focus();
                }
            } else {
                $("#txtCusAddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }
    } else {
        $("#txtCusId").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnCustomerSave").attr('disabled', false);
    } else {
        $("#btnCustomerSave").attr('disabled', true);
    }
}

$('#btnCustomerSave').click(function () {
    checkIfValid();
});
//validation ended




//Item Content-------------------------------------------------------------------------------------------------------------

$("#btnItemSave").click(function (){
    saveItem();
    clearItemAll();
    loadAllItem();
});

$("#btnItemSearch").click(function (){
    var searchItemId = $("#txtSearchItem").val();

    var itemResponse = searchItem(searchItemId);

    if (itemResponse){
        $("#txtItemCode").val(itemResponse.id);
        $("#txtItemName").val(itemResponse.name);
        $("#txtItemQuantity").val(itemResponse.qty);
        $("#txtItemUnitPrice").val(itemResponse.unitPrice);
    }else{
        clearItemAll();
        alert("No Such a Item");
    }
});

function loadAllItem(){
    $("#itemToTable").empty();
    for (var i of itemDB){
        let itemRow = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.qty}</td><td>${i.unitPrice}</td></tr>`;
        $("#itemToTable").append(itemRow);
    }
}

function saveItem(){
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtItemQuantity").val();
    let itemUnitPrice = $("#txtItemUnitPrice").val();

    var itemObject = {
        id: itemCode,
        name: itemName,
        qty: itemQty,
        unitPrice: itemUnitPrice
    };

    itemDB.push(itemObject);
}

function searchItem(id){
    for (let i = 0; i < itemDB.length; i++){
        if (itemDB[i].id == id){
            return itemDB[i];
        }
    }
}

const itemIdRegEx = /^(I00-)[0-9]{3,4}$/;
const itemNameRegEx = /^[A-z ]{3,30}$/;
const itemQtyRegEx = /^[0-9]{1,5}$/;
const itemPriceRegEx = /^[0-9]{2,6}[.][0]$/;

$('#txtItemCode,#txtItemName,#txtItemQuantity,#txtItemUnitPrice').on('keydown', function (eventOb){
    if (eventOb.key == "Tab"){
        eventOb.preventDefault();
    }
});

$('#txtItemCode,#txtItemName,#txtItemQuantity,#txtItemUnitPrice').on('blur', function (){
    formItemValid();
});






