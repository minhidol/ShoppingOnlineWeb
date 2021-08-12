const shopModel = require("../models/shop.models");

const shopInterface = async (req, res) => {
  try {
    // check weather the user has their shop already
    let data = await shopModel.ownShop(req.params.id);
    let html = "";
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
      res.send("Shop");
    }

    // if not, send html interface for opening shop
    // otherwise, show the shop information
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

module.exports = {
  shopInterface,
  openShop,
};
