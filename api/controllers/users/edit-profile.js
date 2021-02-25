const UserService = require("../../services/user.service");

module.exports = async function updateProfile(req, res) {
    try {
        let userId = req.body.loggedInUserId;
        let name = req.body.user_name;
        let email = req.body.email;
        let editUser = await UserService.updateUser(userId, name, email);
        res.json(editUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}