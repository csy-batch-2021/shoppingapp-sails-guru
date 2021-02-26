const UserService = require("../../services/user.service");

module.exports = async function usersList(req, res) {
    try {
        let userLists = await UserService.userFullList();
        res.json(userLists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
