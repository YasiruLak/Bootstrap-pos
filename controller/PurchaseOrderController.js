function loadAllOrderDetail() {
    $("#orderDetailTable").empty();
    for (let i = 0; i < orderDetailDB.length; i++){
        $("#orderDetailTable").append("<tr>" +
            "<td>"+orderDetailDB[i].getOrderId()+"</td>" +
            "<td>"+orderDetailDB[i].getOrderDate()+"</td>" +
            "<td>"+orderDetailDB[i].getCusId()+"</td>" +
            "<td>"+orderDetailDB[i].getCusName()+"</td>" +
            "<td>"+orderDetailDB[i].getItemCode()+"</td>" +
            "<td>"+orderDetailDB[i].getItemName()+"</td>" +
            "<td>"+orderDetailDB[i].getItemQty()+"</td>" +
            "<td>"+orderDetailDB[i].getDiscount()+"</td>" +
            "<td>"+orderDetailDB[i].getTotAmount()+"</td>" +
            "</tr>");
    }
}

function loadAllOrder() {
    $("#orderTable").empty();
    for (let i = 0; i < orderDB.length; i++){
        $("#orderTable").append("<tr>" +
            "<td>"+orderDB[i].getOrderId()+"</td>" +
            "<td>"+orderDB[i].getCustomerID()+"</td>" +
            "<td>"+orderDB[i].getDate()+"</td>" +
            "<td>"+orderDB[i].getTotal()+"</td>" +
            "</tr>");
    }
}