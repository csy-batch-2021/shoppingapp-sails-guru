const UserService = require("../../services/user.service");

module.exports = async function users(req, res) {
    try {
        let isValidUser = await UserService.users();
        res.json(isValidUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = async function updatePassword(req, res) {
    try {
        let userId = req.body.loggedInUserId;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let updatePassword = await UserService.passwordUpdate(userId, oldPassword, newPassword);
        res.json(updatePassword);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};