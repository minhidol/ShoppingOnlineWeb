const shopModel = require("../models/shop.models");
const ratingModel = require("../models/rating.models");

const shopInterface = async (req, res) => {
  try {
    // check weather the user has their shop already
    let data = await shopModel.ownShop(req.params.id);
    let html = "";
    if (data[0].ShopID == null) {
      // if not, send html interface for opening shop
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
      `<script type="text/javascript"> alert("Rating success");</script>`
    );

    // console.log(req.body);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  shopInterface,
  openShop,
  ratingInterface,
  RateProduct,
};
