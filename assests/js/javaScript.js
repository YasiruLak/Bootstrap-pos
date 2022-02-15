
//Hide All Content
$("#dashboardContent").css("display","block");
$("#customerContent").css("display","none");
$("#itemContent").css("display","none");
$("#orderContent").css("display","none");
$("#purchaseOrderContent").css("display","none");


$("#linkCustomer").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","block");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","none");
})

$("#linkItem").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","block");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","none");
})

$("#linkOrder").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","block");
    $("#purchaseOrderContent").css("display","none");
})

$("#linkPurchaseOrder").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","block");
})

$("#linkHome").click(function (){
    $("#dashboardContent").css("display","block");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","none");
})


$("#btnCustomerSave").click(function (){

    $("#customerTable>tr").off("click");

    let customerId = $("#txtCusId").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerContact = $("#txtCusContact").val();

    let row = `<tr> <td>${customerId}</td> <td>${customerName}</td> <td>${customerAddress}</td> <td>${customerContact}</td> </tr>`;

    $("#customerTable").append(row);

    $("#txtCusId").val("");
    $("#txtCusName").val("");
    $("#txtCusAddress").val("");
    $("#txtCusContact").val("");

    $("#customerTable>tr").click(function (){
        let cusId = $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusContact = $(this).children(":eq(3)").text();

        $("#txtCusId").val(cusId);
        $("#txtCusName").val(cusName);
        $("#txtCusAddress").val(cusAddress);
        $("#txtCusContact").val(cusContact);

    });

});

$("#txtCusId").keydown(function (event){
   if (event.key=="Enter"){
       $("#txtCusName").focus();
   }
});

$("#txtCusName").keydown(function (event){
    if (event.key=="Enter"){
        $("#txtCusAddress").focus();
    }
});

$("#txtCusAddress").keydown(function (event){
    if (event.key=="Enter"){
        $("#txtCusContact").focus();
    }
});

$("#txtCusContact").keydown(function (event){
    if (event.key=="Enter"){
        $("#btnCustomerSave").focus();
    }
});




