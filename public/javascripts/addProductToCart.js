
function addProductToCart(e){
    var parent = e.path[1].childNodes;
    var body = {
        account: 1,
        productID: parent[1].innerHTML,
        quantity: 1,
        price: parent[5].innerHTML
    }
    console.log(body)
    fetch('http://localhost:3000/bill/addProductToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log('Error addProductToCart', err)
    }) 
  
}