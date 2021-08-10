const productTypeModel = require("../models/productType.models");
const productById = require("../models/product.models");

const getProductType = async (req, res) => {
  try {
    const data = await productTypeModel.getProductType();
    res.json(data);
  } catch (err) {
    console.log("Error when get product type", err.message);
    res.json('Error when get product type ', err.message)
  }

  // productTypeModel.getProductType(function(err, data){
  //     if(err){
  //         console.log(err)
  //     }
  //     res.send(data)
  // })
};

const getProductById = async (req, res) => {
  try {
    const data = await productById.getProductById(req.params);
    res.render('productDetail.hbs', {product: data.recordset[0]})
  } catch (err) {
    console.log("Error when get product by id", err.message);
    res.json('Error when get product by id ', err.message)
  }
}

module.exports = {
  getProductType, getProductById
};
