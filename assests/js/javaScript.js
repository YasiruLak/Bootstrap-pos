
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
