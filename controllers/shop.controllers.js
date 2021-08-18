const shopModel = require("../models/shop.models");
const ratingModel = require("../models/rating.models");
const productModel = require("../models/product.models");
const billModel = require("../models/bill.models");

const shopInterface = async (req, res) => {
  try {
    // check weather the user has their shop already
    let data = await shopModel.ownShop(req.params.id);
    let html = "";
    // if not, send html interface for opening shop
    if (data[0].ShopID == null) {
      html += '<div class="bg-light mb-3 p-4">';
      html += `<form action=http://localhost:3000/profile/${data[0].AccountID}/openShop method='POST'>`;
      html += '<div class="form-group">';
      html += "<h5>Your card ID number</h5>";
      html += '<input type="text" class="form-control" name="cardIDNumber">';
      html += "</div>";
      html += '<div class="form-group">';
      html += "<h5>Your shop name will be</h5>";
      html += '<input type="text" class="form-control" name="shopName">';
      html += "</div>";
      html += '<div class="form-group">';
      html += "<h5>Your pickup address</h5>";
      html +=
        '<input type="text" class="form-control" name="pickupAddress"></div>';
      html += '<div class="form-group">';
      html += "<h5>Transportation</h5>";
      html +=
        '<input type="text" class="form-control" name="transportation"></div>';
      html += '<div class="form-group">';
      html += `<input type="hidden" name="accountID" value=${data[0].AccountID} />`;
      html +=
        '<input type="submit" class="form-control btn btn-success" name="createShopSubmit" value="Create shop">';
      html += "</div></form></div>";

      res.send(html);
    } else {
      // otherwise, show the shop information
      res.send("Shop");
    }
  } catch (error) {}
};

const openShop = async (req, res) => {
  try {
    await shopModel.openShop(
      req.body.accountID,
      req.body.shopName,
      req.body.cardIDNumber,
      req.body.pickupAddress,
      req.body.transportation
    );
    res.send(
      '<script type="text/javascript"> alert("Open shop success");</script>'
    );
  } catch (error) {
    throw error;
  }
};

const ratingInterface = async (req, res) => {
  try {
    const accountID = req.params.id;
    let invoiceID = await ratingModel.getInvoiceID(accountID);

    html = "<h5>Please rate your orders</h5>";
    await Promise.all(
      invoiceID.map(async (invoiceid) => {
        let result = await ratingModel.showInvoiceDetail(
          invoiceid["InvoiceID"]
        );
        await Promise.all(
          result.map(async (item) => {
            html += `<div class="bg-light mb-3 p-4">`;
            html += `<div class="invoice-wrapper d-flex flex-column">`;
            html += `<div class="my-3">`;
            html += `<div class="order-content d-flex flex-row border-top p-2">`;
            html += `<div class="order-info">`;
            html += `<img src="/images/image.png" width="10%">`;
            html += `<div class="ml-3 mt-3">`;
            html += `<h5 class="text-left">${item.ProductName}</h5>`;
            html += `<p>x${item.Qty}</p>`;
            html += `</div>`;
            html += `</div>`;
            html += `<p><small>$</small>${item.Price}</p>`;
            html += `</div>`;
            html += `</div>`;
            html += `<h4 class="text-right">Total:`;
            html += `<span class="text-danger"><small>$</small>${item.Subtotal}</span>`;
            html += `</h4>`;
            html += `<form action="http://localhost:3000/profile/${accountID}/openRating" method="POST">`;
            html += `<input type="hidden" name="accountIDComment" value=${accountID} />`;
            html += `<input type="hidden" name="productIDComment" value=${item.ProductID} />`;
            html += `<div class="form-group d-flex flex-row">`;
            html += `<h5>Star rate: </h5>`;
            html += `<select class="form-control" name="starRate" style="margin-left: 20px; margin-top: -10px; width: 7%">`;
            html += `<option value="5">5</option>`;
            html += `<option value="4">4</option>`;
            html += `<option value="3">3</option>`;
            html += `<option value="2">2</option>`;
            html += `<option value="1">1</option>`;
            html += `</select>`;
            html += `</div>`;
            html += `<div class="form-group d-flex flex-row" style="align-items: center; justify-content:space-between">`;
            html += `<textarea name="comment" id="" cols="900" rows="2" style="margin-right: 10px; padding: 5px" ></textarea>`;
            html += `<input class="btn btn-success form-control" type="submit" name="commentSubmit" value="Comment" style="margin-top: 15px;">`;
            html += `</div>`;
            html += `</form>`;
            html += `</div>`;
            html += `</div>`;

            // console.log(item.InvoiceID);
          })
        );
      })
    );
    res.send(html);
  } catch (error) {
    throw error;
  }
};

const RateProduct = async (req, res) => {
  try {
    await ratingModel.RateProduct(
      req.body.accountIDComment,
      req.body.productIDComment,
      req.body.starRate,
      req.body.comment
    );
    res.send(
      `<script type="text/javascript"> alert("Rating success"); window.location.href='http://localhost:3000/product/getProductById/${req.body.productIDComment}'</script>`
    );

    // console.log(req.body);
  } catch (error) {
    throw error;
  }
};
const getShop = async (req, res) => {
  try {
    const data = await shopModel.getShopById(req.params);
    const data2 = await shopModel.getProductByShop(req.params);
    const listBillOfShop = await billModel.getBillForShop(1);
    for (var i = 0; i < listBillOfShop.length; i++) {
      if (listBillOfShop[i].InvoiceStatus[0] == 2) {
        listBillOfShop[i].OrderStatusName = "Đã hủy";
      } else if (listBillOfShop[i].InvoiceStatus[0] == 3) {
        listBillOfShop[i].OrderStatusName = "Chưa xác nhận";
      } else if (listBillOfShop[i].InvoiceStatus[0] == 5) {
        listBillOfShop[i].OrderStatusName = "Đã xác nhận";
      }
    }
    console.log(listBillOfShop);
    res.render("shopDetail.hbs", {
      shop: data.recordset[0],
      products: data2.recordset,
      listBillOfShop: listBillOfShop,
      listBillOfShopJS: JSON.stringify(listBillOfShop),
    });
  } catch (err) {
    console.log("Error when get shop by id", err.message);
    res.json("Error when get shop by id ", err.message);
  }
};

const showInvoiceStatus = async (req, res) => {
  try {
    const accountID = req.params.id;
    // let invoiceID = await ratingModel.getInvoiceID(accountID);
    let invoiceStatus = await shopModel.showInvoiceStatus(accountID);

    html = "<h5>This is your order:</h5>";

    await Promise.all(
      invoiceStatus.map(async (i) => {
        let result = await ratingModel.showInvoiceDetail(i["InvoiceID"]);
        await Promise.all(
          result.map(async (item) => {
            html += `<div class="bg-light mb-3 p-4">`;
            html += `<div class="d-flex flex-row" style="justify-content: space-between;">`;
            html += `<h6 class="text-secondary">${i["CreatedDate"]}</h6>`;
            html += `<h6 class="text-primary mt-1">${i["OrderStatusName"]}</h6>`;
            html += `</div>`;
            html += `<div class="invoice-wrapper d-flex flex-column">`;
            html += `<div class="my-3">`;
            html += `<div class="order-content d-flex flex-row border-top p-2">`;
            html += `<div class="order-info">`;
            html += `<img src="/images/image.png" width="10%">`;
            html += `<div class="ml-3 mt-3">`;
            html += `<h5 class="text-left">${item.ProductName}</h5>`;
            html += `<p>x${item.Qty}</p>`;
            html += `</div>`;
            html += `</div>`;
            html += `<p><small>$</small>${item.Price}</p>`;
            html += `</div>`;
            html += `</div>`;
            html += `<h4 class="text-right">Total:`;
            html += `<span class="text-danger"><small>$</small>${item.Subtotal}</span>`;
            html += `</h4>`;

            html += `</div>`;
            html += `</div>`;
          })
        );
      })
    );

    res.send(html);
  } catch (error) {}
};

const insProduct = async (req, res) => {
  try {
    const data = await req.params["shopid"];
    const data2 = await shopModel.getShopById(req.params);
    res.render("shopInsertProduct.hbs", {
      shopid: data,
      shop: data2.recordset[0],
    });
  } catch (err) {
    console.log("Error when insert", err.message);
    res.json("Error when insert ", err.message);
  }
};

const updProduct = async (req, res) => {
  try {
    const data = await req.params["shopid"];
    const productid = await req.params["id"];
    const data2 = await shopModel.getShopById(req.params);
    const product = await productModel.getProductById(req.params);
    console.log(data2);
    res.render("shopUpdateProduct.hbs", {
      shopid: data,
      shop: data2.recordset[0],
      productid: productid,
      product: product.recordset[0],
    });
  } catch (err) {
    console.log("Error when update", err.message);
    res.json("Error when update ", err.message);
  }
};

module.exports = {
  shopInterface,
  openShop,
  ratingInterface,
  RateProduct,
  getShop,
  showInvoiceStatus,
  insProduct,
  updProduct,
};
