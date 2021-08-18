const ratingModel = require("../models/rating.models");

const showRating = async (req, res) => {
  try {
    let data = await ratingModel.showRating();

    // res.send("profile.hbs", { data: data });
    res.send(data);
  } catch (error) {}
};

module.exports = {
  showRating,
};
