const profileModel = require("../models/profile.models");

const getProfile = async (req, res) => {
  try {
    let data = await profileModel.getProfile(req.params.id);
    res.render("profile.hbs", { Account: data });
  } catch (error) {}
};

module.exports = {
  getProfile,
};
