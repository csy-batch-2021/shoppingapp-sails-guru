const UserService = require("../../services/user.service");


module.exports = async function wallet(req, res) {
    try {
        // let userId = req.body.loggedInUserId;
        let userId = req.query.userId;
        let walletBals = await UserService.walletBalance(userId);
        res.json(walletBals);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}