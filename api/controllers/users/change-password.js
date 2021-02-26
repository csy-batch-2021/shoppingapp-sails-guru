const UserService = require("../../services/user.service");

module.exports = async function updatePassword(req, res) {
    console.log(req.body);
    try {
        let userId = req.body.loggedInUserId;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let updatedPassword = await UserService.passwordUpdate(userId, oldPassword, newPassword);
        res.json(updatedPassword);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};