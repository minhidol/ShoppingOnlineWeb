async function postProduct(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

async function addProductToCart(e) {
  e.preventDefault();
  console.log("event");
  var event = e.path[2].childNodes[5];
  console.log(event)
  var price = event.childNodes[1].innerHTML.split(" ")[0]
  var productID = event.childNodes[3].innerHTML
    var parent = e.path[1].childNodes;
    var body = {
      account: 1,
      productID: productID,
      quantity: 1,
      price: price,
    };
    const result = await postProduct(
      "http://localhost:3000/bill/addProductToCart",
      body
    );
    console.log(result);
    if (result.ErrorCode == 0) {
      alert("Thêm thành công!");
    } else {
      alert("Sản phầm đã được thêm vào giỏ hàng!");
    }
}

function addCountForProduct(x) {
  var div = x.path[5].childNodes;
  var shopName = div[3].innerHTML;
  var product = x;
  var productID =
    product.path[3].childNodes[3].childNodes[1].childNodes[1].innerHTML;

  var count = product.path[3].childNodes[3].childNodes[1].childNodes[5].value;
  var value = product.path[3].childNodes[3].childNodes[1].childNodes[5];
  var price =
    product.path[3].childNodes[3].childNodes[1].parentNode.childNodes[1]
      .parentNode.parentNode.childNodes[5].childNodes[3];
  var cart = localStorage.getItem("shoppingCart");
  var shoppingCart = JSON.parse(cart);
  //console.log(price)
  for (var i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].ShopName == shopName) {
      for (var j = 0; j < shoppingCart[i].listProduct.length; j++) {
        if (shoppingCart[i].listProduct[j].ProductID == productID) {
          var _count = parseInt(count) + 1;
          value.value = _count;
          shoppingCart[i].listProduct[j].Qty += 1;
          shoppingCart[i].listProduct[j].Subtotal +=
            shoppingCart[i].listProduct[j].ProductPrice;
          console.log(shoppingCart[i].listProduct[j].Subtotal);
          price.innerHTML = shoppingCart[i].listProduct[j].Subtotal;
        }
      }
    }
  }
  console.log(shoppingCart);
  var string_cart = JSON.stringify(shoppingCart);
  //console.log('add ', string_cart)
  localStorage.setItem("shoppingCart", string_cart);
}

async function saveCart(x) {
  x.preventDefault();
  var productID = x.path[3].childNodes[3].childNodes[1].childNodes[1].innerHTML;
  var shopName = x.path[5].childNodes[3].innerHTML;
  var cart = localStorage.getItem("shoppingCart");
  var shoppingCart = JSON.parse(cart);
  for (var i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].ShopName == shopName) {
      for (var j = 0; j < shoppingCart[i].listProduct.length; j++) {
        if (shoppingCart[i].listProduct[j].ProductID == productID) {
          var product = shoppingCart[i].listProduct[j];
          //var body = product
          //console.log(body)
          const result = await postProduct(
            "http://localhost:3000/bill/updateCart",
            product
          );
          if (result.ErrorCode == 0) {
            alert("Lưu thành công!");
          } else {
            alert("Lưu thất bại!");
          }
        }
      }
    }
  }
}

async function createBill(event) {
  var shopName = event.path[2].childNodes[3].innerHTML;
  var listProduct = JSON.parse(localStorage.getItem("shoppingCart"));
  for (var i = 0; i < listProduct.length; i++) {
    if (listProduct[i].ShopName == shopName) {
      var list_product = listProduct[i];
      const body = {
        shopName: list_product.listProduct[0].ShopID,
      };
      localStorage.setItem("bill", JSON.stringify(list_product));
      const shopInfo = await postProduct(
        "http://localhost:3000/bill/shopOfBill",
        body
      );
      localStorage.setItem("shop", JSON.stringify(shopInfo.data));
      if (confirm("Vui lòng chỉnh sửa thông tin cá nhân trước khi tạo bill")) {
        window.location.href = "http://localhost:3000/bill/showBill";
      } else {
        // Do nothing!
        return;
      }
      //window.location.href = "http://www.w3schools.com";
    }
  }
}
