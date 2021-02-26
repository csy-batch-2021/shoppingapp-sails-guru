const UserService = require("../../services/user.service");


module.exports = async function wallet(req, res) {
    console.log('userId', userId);
    try {
        let userId = req.query.userId;
        let walletBals = await UserService.walletBalance(userId);
        res.json(walletBals);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}