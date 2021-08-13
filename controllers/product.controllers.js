const productTypeModel = require("../models/productType.models");
const product = require("../models/product.models");
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
    const data = await product.getProductById(req.params);
    const rating = await ratingModel.getRating(req.params);
    res.render("productDetail.hbs", {
      product: data.recordset[0],
      stockqty: data.recordset[0].StockQty,
      image: data.recordset[0].ProductImage,
      rating: rating
    });
  } catch (err) {
    console.log("Error when get product by id", err.message);
    res.json("Error when get product by id ", err.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await product.getAllProducts(parseInt(req.params['pageid']) - 1);
    res.render('testCartProductIndex.hbs', {products: data.recordset, page: req.params['pageid']});
  }
  catch (er) {
    console.log("Error when get products", err.message);
    res.json("Error when get products", err.message);
  }
}

const searchProducts = async (req, res) => {
  try {
    const data = await product.searchProduct(req.query.name);
    res.render('searchResult.hbs', {products: data.recordset})
  }
  catch(err) {
    console.log('error', err)
  }
}

const delProduct = async (req, res) => {
  try {
    const data = await product.deleteProduct(req.params);
    res.json(data);
  }
  catch(err) {
    console.log('error', err)
  }
}

module.exports = {
  getProductType,
  getProductById,
  getAllProducts,
  searchProducts,
  delProduct
};
