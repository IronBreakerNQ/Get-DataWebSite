const DataWebSite = require('./dataIdWebsite');
const SellOrders = require('../model/SellOrders');
const BuyOrders = require('../model/BuyOrders');

module.exports = {
    async createSellOD(req,res) {
        try {
            const sellOrdersData = await DataWebSite.getSellOrders();
            const sellOrders = await SellOrders.insertMany(sellOrdersData.SellOBill); // Tạo nhiều instance của SellOrders và lưu vào cơ sở dữ liệu
            res.status(201).send(sellOrders); // Trả về danh sách các đối tượng sellOrders đã được lưu
        } catch (error) {
           res.status(400).send(error); // Trả về lỗi nếu có lỗi xảy ra
        }
    },

    async createBuyOD(req,res) {
        try {
            const buyOrdersData = await DataWebSite.getBuyOrders();
            const buyOrders = await BuyOrders.insertMany(buyOrdersData.BuyObill); // Tạo nhiều instance của BuyOrders và lưu vào cơ sở dữ liệu
            res.status(201).send(buyOrders); // Trả về danh sách các đối tượng buyOrders đã được lưu
        } catch (error) {
            res.status(400).send(error); // Trả về lỗi nếu có lỗi xảy ra
        }
    }
}
