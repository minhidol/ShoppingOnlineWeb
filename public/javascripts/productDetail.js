
minus = () => {
    var numQty = parseInt(document.getElementById("numQty").value)
    numQty -= 1;
    if (numQty == 0)
        document.getElementById("btnMinus").disabled = true;
    else
        document.getElementById("btnMinus").disabled = false;
    document.getElementById("numQty").value = numQty.toString()
}

plus = () => {
    var numQty = parseInt(document.getElementById("numQty").value)
    numQty += 1;
    document.getElementById("numQty").value = numQty.toString()
    document.getElementById("btnMinus").disabled = false;
}

change = () => {
    var numQty = parseInt(document.getElementById("numQty").value)
    if (numQty <= 0) {
        document.getElementById("numQty").value = 0
        document.getElementById("btnMinus").disabled = true;
    }
    if (numQty > 0)
        document.getElementById("btnMinus").disabled = false;
}
