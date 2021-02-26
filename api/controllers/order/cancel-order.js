const OrderService = require("../../services/order.service")

module.exports = async function cancelOrder(req, res) {
    let orderId = req.params.id;
    let userId = req.body.userId;
    let orderDetails = { orderId: orderId, userId: userId }
    console.log("orderDetails", orderDetails);
    try {
        let order = await OrderService.cancelOrder(orderDetails);
        res.json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}