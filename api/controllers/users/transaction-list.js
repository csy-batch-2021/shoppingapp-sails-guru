const UserService = require("../../services/user.service");

module.exports = async function transactionList(req, res) {
    try {
        let transactionLists = await UserService.transactionFullList();
        res.json(transactionLists);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
