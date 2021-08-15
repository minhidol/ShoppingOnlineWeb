const data = [ { CustomerAccountID: 1,
    ProductID: [ 1, 1 ],
    Qty: 14,
    Subtotal: 5954.1613,
    ProductName: 'New Balance Running Phone Holder Armband Sleeve - ',
    ProductTypeID: 1,
    Description:
     'PASSIVE NOISE CANCELLATION – Jabra Evolve2 65 wireless headphones feature superior passive noise cancellation thanks to the enhanced memory foam padding and new angled design that cancels 48% more of the noise around you',
    ProductPrice: 1620.6809,
    StockQty: 39,
    ProductImage: null,
    AvgStarRate: 3.68,
    ShopID: 822 },
  { CustomerAccountID: 1,
    ProductID: [ 36, 36 ],
    Qty: 1,
    Subtotal: 1405,
    ProductName: 'Latest Home Button Replacement for iPhone 7 7Plus ',
    ProductTypeID: 36,
    Description:
     'The seller has not provided information about this item yet.',
    ProductPrice: 1405.1479,
    StockQty: 60,
    ProductImage: null,
    AvgStarRate: 4.51,
    ShopID: 8 },
  { CustomerAccountID: 1,
    ProductID: [ 1540, 1540 ],
    Qty: 1,
    Subtotal: 550,
    ProductName: 'KIKET Magnetic Clear Case[1x Magnetic Blue Leather',
    ProductTypeID: 1540,
    Description:
     'For iPhone XR Case: ONLY Compatible with Apple iPhone XR 6.1 inch. DOES NOT compatible with iPhone X/Xs/Xs Max',
    ProductPrice: 550.078,
    StockQty: 40,
    ProductImage: null,
    AvgStarRate: 5,
    ShopID: 7 },
  { CustomerAccountID: 1,
    ProductID: [ 4388, 4388 ],
    Qty: 1,
    Subtotal: 563,
    ProductName: 'MPOWERD Luci String Lights',
    ProductTypeID: 4388,
    Description:
     '2020 Cup Phone Holder - The base can be adjusted from Min. 2. 3" to Max. 3. 3", fits most standard car cup holder, no need extra tools. Featuring one-button release curved arm and extendable feet, letting you can enjoy safe and the best viewing angle . Don\'t need to affix anything to your dash or window, just simply put it in your car cup holder and fix.',
    ProductPrice: 563.122,
    StockQty: 24,
    ProductImage: null,
    AvgStarRate: 0.21,
    ShopID: 7 },
  { CustomerAccountID: 1,
    ProductID: [ 7871, 7871 ],
    Qty: 1,
    Subtotal: 625,
    ProductName: 'TechMatte Magnetic Replacement Cap Compatible with',
    ProductTypeID: 7871,
    Description:
     'Clearer conversations for more efficient meetings, crystal-clear voice experience ensures everyone is heard.',
    ProductPrice: 625.1889,
    StockQty: 95,
    ProductImage: null,
    AvgStarRate: 2.83,
    ShopID: 8 } ]

var shopID = []
var shoppingCart = []
for(var i = 0; i < data.length; i++){
    if(!shopID.includes(data[i].ShopID))
        shopID.push(data[i].ShopID)
    //console.log(cart)
}
for(var i = 0; i < shopID.length; i++){
    shoppingCart.push({shopID: shopID[i]})
}

for(var i = 0; i < shoppingCart.length; i++){
    shoppingCart[i].listProduct = []
    for(var j = 0; j < data.length; j++){
        if(data[j].ShopID == shoppingCart[i].shopID){
            shoppingCart[i].listProduct.push(data[j])
        }
    }
}

console.log(shoppingCart[1].listProduct[1])