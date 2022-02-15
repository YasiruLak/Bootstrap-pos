
//Hide All Content
$("#dashboardContent").css("display","block");
$("#customerContent").css("display","none");
$("#itemContent").css("display","none");
$("#orderContent").css("display","none");
$("#purchaseOrderContent").css("display","none");

$("#linkHome").css('color','white');
$("#linkCustomer").css('color','black');
$("#linkItem").css('color','black');
$("#linkOrder").css('color','black');
$("#linkPurchaseOrder").css('color','black');

$("#linkCustomer").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","block");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","none");

    $("#linkHome").css('color','black');
    $("#linkCustomer").css('color','white');
    $("#linkItem").css('color','black');
    $("#linkOrder").css('color','black');
    $("#linkPurchaseOrder").css('color','black');
})

$("#linkItem").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","block");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","none");

    $("#linkHome").css('color','black');
    $("#linkCustomer").css('color','black');
    $("#linkItem").css('color','white');
    $("#linkOrder").css('color','black');
    $("#linkPurchaseOrder").css('color','black');
})

$("#linkOrder").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","block");
    $("#purchaseOrderContent").css("display","none");

    $("#linkHome").css('color','black');
    $("#linkCustomer").css('color','black');
    $("#linkItem").css('color','black');
    $("#linkOrder").css('color','white');
    $("#linkPurchaseOrder").css('color','black');
})

$("#linkPurchaseOrder").click(function (){
    $("#dashboardContent").css("display","none");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","block");

    $("#linkHome").css('color','black');
    $("#linkCustomer").css('color','black');
    $("#linkItem").css('color','black');
    $("#linkOrder").css('color','black');
    $("#linkPurchaseOrder").css('color','white');
})

$("#linkHome").click(function (){
    $("#dashboardContent").css("display","block");
    $("#customerContent").css("display","none");
    $("#itemContent").css("display","none");
    $("#orderContent").css("display","none");
    $("#purchaseOrderContent").css("display","none");

    $("#linkHome").css('color','white');
    $("#linkCustomer").css('color','black');
    $("#linkItem").css('color','black');
    $("#linkOrder").css('color','black');
    $("#linkPurchaseOrder").css('color','black');
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




