const UserService = require("../../services/user.service");

module.exports = async function usersList(req, res) {
    try {
        let balance = req.body.balance;
        let userId = req.body.userId;
        let updatebalance = await UserService.userFullList(balance, userId);
        res.json(updatebalance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}