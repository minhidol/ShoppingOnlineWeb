const shopModel = require("../models/shop.models");

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

const getShop = async (req, res) => {
  try {
    const data = await shopModel.getShopById(req.params);
    const data2 = await shopModel.getProductByShop(req.params);
    res.render("shopDetail.hbs", {
      shop: data.recordset[0],
      products: data2.recordset
    });
  } catch (err) {
    console.log("Error when get shop by id", err.message);
    res.json("Error when get shop by id ", err.message);
  }
}

module.exports = {
  shopInterface,
  openShop,
  getShop
};
