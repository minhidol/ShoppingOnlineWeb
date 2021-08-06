const productTypeModel = require("../models/productType.models");

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

module.exports = {
  getProductType,
};
