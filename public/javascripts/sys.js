$(document).ready(() => {

    $.ajax({
        url: "http://localhost:3000/getBestSellings/data", 
        method: 'GET',
        success: function(response){
            if(response.rows.length() > 0){
                for(let index = 0; index < response.rows.length(); index++) {
                    var newRow = $("<tr>");
                    var cols = "";
                    var ProductName = '';
                    var ProductPrice = '';
                    var AvgStarRate = '';
                    var TotalQuantity = '';
                    cols += '<td> '+ response.rows[index].ProductName +'</td>';
                    cols += '<td> '+ response.rows[index].ProductPrice +'</td>';
                    cols += '<td> '+ response.rows[index].AvgStarRate+'</td>'; 
                    cols += '<td> '+ response.rows[index].TotalQuantity+'</td>';  
                    newRow.append(cols);
                    $("#tableData .tbody").append(newRow);
                }  
    
            }
        }
    })
    })