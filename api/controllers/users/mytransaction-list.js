const UserService = require("../../services/user.service");

module.exports = async function myTransactionList(req, res) {
    try {
        let userId = req.body.userId;
        let myTransactionLists = await UserService.myTransactionFullList(userId);
        res.json(myTransactionLists);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
