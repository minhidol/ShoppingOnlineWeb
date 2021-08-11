const productTypeModel = require("../models/productType.models");
const productById = require("../models/product.models");
const ratingModel = require("../models/rating.models");

const getProductType = async (req, res) => {
  try {
    const data = await productTypeModel.getProductType();
    res.json(data);
  } catch (err) {
    console.log("Error when get product type", err.message);
    res.json("Error when get product type ", err.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await productById.getProductById(req.params);
    const rating = await ratingModel.getRating(req.params);
    res.render("productDetail.hbs", {
      product: data.recordset[0],
      rating: rating,
    });
  } catch (err) {
    console.log("Error when get product by id", err.message);
    res.json("Error when get product by id ", err.message);
  }
};

module.exports = {
  getProductType,
  getProductById,
};
