const OrderService = require("../../services/orderService");
const OrderValidator = require("../../validator/orderValidator");

module.exports = async function myOrders(req, res) {
    let userId = req.query.userId;
    console.log('userId', userId);
    try {
        OrderValidator.isValidNumber(userId, "Please Enter Valid User ID");
        let myOrder = await OrderService.getMyOrder(userId);
        const myOrdersList = myOrder.sort(
            (a, b) => b.created_date - a.created_date
        );
        res.json(myOrdersList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}