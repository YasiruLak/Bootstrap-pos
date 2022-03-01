$("#btnCustomerSave").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
    loadCustomerDataTextField();

});

$("#btnSearchCustomer").click(function () {
    var searchID = $("#txtSearchCustomer").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCusId").val(response.id);
        $("#txtCusName").val(response.name);
        $("#txtCusAddress").val(response.address);
        $("#txtCusContact").val(response.contact);

    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

function loadCustomerDataTextField(){
    $("#customerTable>tr").click('click',function () {
        let cusId1 = $(this).children(":eq(0)").text();
        let cusName1 = $(this).children(":eq(1)").text();
        let cusAddress1 = $(this).children(":eq(2)").text();
        let cusContact1 = $(this).children(":eq(3)").text();

        $("#txtCusId").val(cusId1);
        $("#txtCusName").val(cusName1);
        $("#txtCusAddress").val(cusAddress1);
        $("#txtCusContact").val(cusContact1);
    });
}

function loadAllCustomers() {
    $("#customerTable").empty();
    for (let i = 0; i < customerDB.length; i++){
        $("#customerTable").append("<tr>" +
            "<td>"+customerDB[i].getCid()+"</td>" +
            "<td>"+customerDB[i].getName()+"</td>" +
            "<td>"+customerDB[i].getAddress()+"</td>" +
            "<td>"+customerDB[i].getContact()+"</td>" +
            "</tr>");
    }
}

function saveCustomer() {

    let customerID = $("#txtCusId").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerContact = $("#txtCusContact").val();

    customerDB.push(new CustomerDTO(customerID,customerName,customerAddress,customerContact));

    loadCustomerComboBoxData("<option>"+customerID+"</option>");
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

$("#btnDeleteCustomer").click(function (){
    var index = 0;
    for (var i = 0; i < customerDB.length; i++) {
        if ($("#txtCusId").val() == customerDB[i].getCid()) {
            index = i;
        }
    }
    customerDB.splice(index, 1);
    $(this).closest('tr').remove();
    loadAllCustomers();
    clearAll();

});

$("#btnUpdateCustomer").click(function () {
    let cusId2 = $("#txtCusId").val();
    let cusName2 = $("#txtCusName").val();
    let cusAddress2 = $("#txtCusAddress").val();
    let cusContact2 = $("#txtCusContact").val();

    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCid() === cusId2){
            customerDB[i].setName(cusName2);
            customerDB[i].setAddress(cusAddress2);
            customerDB[i].setContact(cusContact2);
        }
    }
    clearAll();
    loadAllCustomers();
    loadCustomerDataTextField();
});

const regExCusId = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{5,20}$/;
const regExCusAddress = /^[0-9/A-z. ,]{7,}$/;
const regExCusContact = /^[0-9]{3}[-]?[0-9]{7}$/;

$('#txtCusId,#txtCusName,#txtCusAddress,#txtCusContact').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtCusId,#txtCusName,#txtCusAddress,#txtCusContact').on('blur', function () {
    formValid();
});

$("#txtCusId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
    if (eventOb.key == "Control") {
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

$("#btnCustomerSave").attr('disabled', true);

function clearAll() {
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
                    $("#lblCusContact").text("Customer Contact is a required field : Pattern 076-8383493");
                    return false;
                }
            } else {
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblCusAddress").text("Customer Name is a required field : Minimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblCusName").text("Customer Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusId").css('border', '2px solid red');
        $("#lblCusId").text("Customer ID is a required field : Pattern C00-000");
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