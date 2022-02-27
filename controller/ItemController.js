$("#btnItemSave").click(function () {
    saveItem();
    clearItemAll();
    loadAllItem();
});

$("#btnItemSearch").click(function () {
    var searchItemId = $("#txtSearchItem").val();

    var itemResponse = searchItem(searchItemId);

    if (itemResponse) {
        $("#txtItemCode").val(itemResponse.id);
        $("#txtItemName").val(itemResponse.name);
        $("#txtItemQuantity").val(itemResponse.qty);
        $("#txtItemUnitPrice").val(itemResponse.unitPrice);
    } else {
        clearItemAll();
        alert("No Such a Item");
    }
});

function loadAllItem() {
    $("#itemToTable").empty();
    for (var i of itemDB) {
        let itemRow = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.qty}</td><td>${i.unitPrice}</td></tr>`;
        $("#itemToTable").append(itemRow);
    }
}

function saveItem() {
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

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            return itemDB[i];
        }
    }
}

const itemIdRegEx = /^(I00-)[0-9]{3,4}$/;
const itemNameRegEx = /^[A-z ]{3,30}$/;
const itemQtyRegEx = /^[0-9]{1,5}$/;
const itemPriceRegEx = /^[0-9]{2,6}[.][0]$/;

$('#txtItemCode,#txtItemName,#txtItemQuantity,#txtItemUnitPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtItemCode,#txtItemName,#txtItemQuantity,#txtItemUnitPrice').on('blur', function () {
    formItemValid();
});

$("#txtItemCode").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
    if (eventOb.key == "Control") {
        var typedItemCode = $("#txtItemCode").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#txtItemCode").val(srcItem.getItemCode());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtItemQuantity").val(srcItem.getItemQty());
        $("#txtItemUnitPrice").val(srcItem.getItemUnitPrice());

    }
});

$("#txtItemName").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtItemQuantity").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#txtItemUnitPrice").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#btnItemSave").attr('disabled', true);

function clearItemAll() {
    $('#txtItemCode,#txtItemName,#txtItemQuantity,#txtItemUnitPrice').val("");
    $('#txtItemCode,#txtItemName,#txtItemQuantity,#txtItemUnitPrice').css('border', '2px solid #ced4da');
    $('#txtItemCode').focus();
    $("#btnItemSave").attr('disabled', true);
    loadAllItem();
    $("#lblItemId,#lblItemName,#lblItemQty,#lblItemUnitPrice").text("");
}

function formItemValid() {
    var itemCode = $("#txtItemCode").val();
    $("#txtItemCode").css('border', '2px solid green');
    $("#lblItemId").text("");
    if (itemIdRegEx.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#lblItemName").text("");
            var itemQty = $("#txtItemQuantity").val();
            if (itemQtyRegEx.test(itemQty)) {
                var itemPrice = $("#txtItemUnitPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                $("#txtItemQuantity").css('border', '2px solid green');
                $("#lblItemQty").text("");
                if (resp) {
                    $("#txtItemUnitPrice").css('border', '2px solid green');
                    $("#lblItemUnitPrice").text("");
                    return true;
                } else {
                    $("#txtItemUnitPrice").css('border', '2px solid red');
                    $("#lblItemUnitPrice").text("Item Unit Price is a required field : Pattern 100.0");
                    return false;
                }
            } else {
                $("#txtItemQuantity").css('border', '2px solid red');
                $("#lblItemQty").text("Item Quantity is a required field : Minimum 2");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Minimum 3, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#lblItemId").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function checkIfItemValid() {
    var itemCode = $("#txtItemCode").val();
    if (itemIdRegEx.test(itemCode)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemQuantity").focus();
            var itemQty = $("#txtItemQuantity").val();
            if (itemQtyRegEx.test(itemQty)) {
                $("#txtItemUnitPrice").focus();
                var itemPrice = $("#txtItemUnitPrice").val();
                var resp = itemPriceRegEx.test(itemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveItem();
                        clearItemAll();
                    }
                } else {
                    $("#txtItemUnitPrice").focus();
                }
            } else {
                $("#txtItemQuantity").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemCode").focus();
    }
}

function setItemButton() {
    let i = formItemValid();
    if (i) {
        $("#btnItemSave").attr('disabled', false);
    } else {
        $("#btnItemSave").attr('disabled', true);
    }
}

$("#btnItemSave").click(function () {
    checkIfItemValid();
});