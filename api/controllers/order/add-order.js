const OrderService = require("../../services/order.service");

module.exports = async function (req, res) {
    console.log('orderDetails', req.body);
    try {
        let orderDetails = req.body;
        console.log("orderDetails", orderDetails);
        let orderedProduct = await OrderService.addOrder(orderDetails);
        res.json(orderedProduct);
    } catch (err) {
        console.log("err.message", err.message);
        res.status(400).json({ message: err.message });
    }

}