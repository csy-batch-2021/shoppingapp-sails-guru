const OrderDAO = require("../dao/order.dao");
const ProductDAO = require("../dao/product.dao");
const OrderValidator = require("../validator/orderValidator");
const ProductService = require("../services/product.service");
const UserValidator = require("../validator/user.validator");
const UserDAO = require("../dao/userdao");

class OrderService {
    // to add a new order
    static async addOrder(orderDetails) {
        try {
            await OrderValidator.validCheck(orderDetails);
            await OrderValidator.isValidId(orderDetails);
            let product = await ProductService.getProductDetails(orderDetails.productId);
            console.log("orderDetails", orderDetails.qty);
            orderDetails.totalAmount = orderDetails.qty * product.price;
            orderDetails.status = "ORDERED";
            orderDetails.created_date = new Date();
            orderDetails.modified_date = new Date();
            orderDetails.created_by = orderDetails.userId;
            orderDetails.modified_by = orderDetails.userId;
            let wallet = await UserDAO.findWalletUserId(orderDetails.userId);
            await OrderValidator.checkWalletBalance(wallet, orderDetails)
            let orderId = await OrderDAO.save(orderDetails);
            let comments = "Order Placed # " + orderId;
            await OrderValidator.toCheckWalletBalance(wallet, orderDetails, comments);
            return "Product Ordered sucessfully";
        } catch (err) {
            console.err(err);
            throw err;
        }
    }

    //get all orders
    static async getAllOrder() {
        try {
            let orders = await OrderDAO.findAll();
            return orders;
        } catch (err) {
            console.err(err);
            throw new Error("Not able to fetch the orders");
        }
    }

    // to change order status delivered
    static async changeOrderStatus(orderId, userId, status) {
        try {
            await OrderValidator.isValidForDelivery(orderId, status);
            return await OrderDAO.findOneAndUpdate(orderId, status, userId);
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

    // to cancel order
    static async cancelOrder(orderDetails) {
        try {

            let userId = orderDetails.userId;
            let orderId = orderDetails.orderId;
            await UserValidator.toCheckValidUserId(userId);
            await OrderValidator.isExistOrderId(orderId);
            var result = await OrderDAO.cancelOrder(orderDetails);
            await OrderValidator.walletBalanceRefund(orderDetails);
            return "Your Amount Has Successfully Refunded To Your Wallet"
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    // to find by order based on user id
    static async getMyOrder(userId) {
        return await OrderDAO.findMyOrder(userId);
    }

    static async myOrderStatusCount(userId) {
        try {
            return await OrderDAO.myOrdersStatusCount(userId);
        } catch (err) {
            console.err(err);
            throw new Error("Not able to fetch the orders");
        }
    }


}

module.exports = {
    addOrder: OrderService.addOrder,
    getAllOrder: OrderService.getAllOrder,
    changeOrderStatus: OrderService.changeOrderStatus,
    cancelOrder: OrderService.cancelOrder,
    getMyOrder: OrderService.getMyOrder,
    myOrderStatusCount: OrderService.myOrderStatusCount,
    findWalletUserId: OrderService.findWalletUserId,

}