const UserService = require("../../services/user.service");

module.exports = async function updateBalance(req, res) {
    console.log(req.body);
    try {
        let balance = req.body.balance;
        let userId = req.body.userId;
        let updatebalance = await UserService.addBalance(balance, userId);
        res.json(updatebalance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}