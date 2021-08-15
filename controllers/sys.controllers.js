const async = require('hbs/lib/async');
const dashboardModel = require('../models/sys.models');

const showDashboard = async(req, res) =>{
    try{
        let data1 = await dashboardModel.bestSellingProducts();
        let data2 = await dashboardModel.highestRevenueShops();
        res.render("dashboard.hbs", {data1 : data1, data2 : data2});
    }catch(err){
        res.json({Error: err.message});
    }
}


module.exports = {showDashboard}