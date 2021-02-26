const UserDAO = require("../dao/userdao");
const ProductDAO = require("../dao/product.dao");
const OrderDAO = require("../dao/order.dao");
class OrderValidator {

    static isValidNumber(input, message) {
        if (input === null || input <= 0) {
            throw new Error(message);
        }
    }

    static async validCheck(orderDetails) {
        this.isValidNumber(orderDetails.userId, 'Please Enter Valid User ID');
        this.isValidNumber(orderDetails.productId, 'Please Enter Valid Product Id');
        this.isValidNumber(orderDetails.qty, 'Please Enter Valid Quantity');

    }

    static async isValidId(orderDetails) {
        var userResult = await UserDAO.findOne(orderDetails.userId);
        var productResult = await ProductDAO.findOne(orderDetails.productId);
        if (userResult === null) {
            throw new Error('Please Check UserID');
        } else if (productResult === null) {
            throw new Error('Please Check ProductID');
        }
    }

    static async isValidForDelivery(orderId, status) {
        var result = await OrderDAO.findOne(orderId);
        var statusText = ['ORDERED', 'DELIVERED', 'CANCELLED'];
        var statusCheck = statusText.includes(status);
        if (!result) {
            throw new Error('Please Entered Valid OrderId');
        } else if (!statusCheck) {
            throw new Error('Please Enter Valid Status');
        } else if (result.status === 'DELIVERED') {
            throw new Error('Delivered Product cannot be Delivered');
        } else if (result.status === 'CANCELLED') {
            throw new Error('Already Order Product has been Cancelled');
        }
    }

    static async isExistOrderId(orderId) {
        var result = await OrderDAO.findOne(orderId);
        if (!result) {
            throw new Error('Please Entered Valid OrderId');
        } else if (result.status === 'DELIVERED') {
            throw new Error('Delivered Product cannot be cancelled');
        } else if (result.status === 'CANCELLED') {
            throw new Error('Already Order Product has been Cancelled');
        }
    }

    static async toCheckWalletBalance(wallet, orderDetails, comments) {
        if (wallet.balance < orderDetails.totalAmount) {
            throw new Error('insufficient Wallet Balance');
        } else {
            let updateWalletbals = wallet.balance - orderDetails.totalAmount;
            await UserDAO.transactionList(wallet.id, orderDetails.totalAmount, orderDetails.created_date, comments);
            await UserDAO.updatedWalletBalance(updateWalletbals, orderDetails.userId);
        }
    }


    static async checkWalletBalance(wallet, orderDetails) {
        if (wallet.balance < orderDetails.totalAmount) {
            throw new Error('insufficient Wallet Balance');
        }
    }

    static async walletBalanceRefund(orderDetails) {
        let cancelledList = await OrderDAO.findOne(orderDetails.orderId);
        let transactionList = await OrderDAO.allTransactions(cancelledList.created_date);
        let existingBalance = await UserDAO.findWalletUserId(transactionList.account_id);
        let updateBalances = existingBalance.balance + transactionList.amount;
        console.log(existingBalance.balance, transactionList.amount)
        await OrderDAO.refundWallet(updateBalances, transactionList.account_id);
        await UserDAO.refundStatus(transactionList);
    }

}

module.exports = {
    isValidNumber: OrderValidator.isValidNumber,
    validCheck: OrderValidator.validCheck,
    isValidId: OrderValidator.isValidId,
    isValidForDelivery: OrderValidator.isValidForDelivery,
    isExistOrderId: OrderValidator.isExistOrderId,
    walletBalanceRefund: OrderValidator.walletBalanceRefund,
    toCheckWalletBalance: OrderValidator.toCheckWalletBalance,
    checkWalletBalance: OrderValidator.checkWalletBalance,

}