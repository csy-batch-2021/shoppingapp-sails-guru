const UserService = require("../../services/user.service");

module.exports = async function registerNewUser(req, res) {
    console.log('loginDetails', req.body);
    try {
        let loginDetails = req.body;
        let isValidUser = await UserService.registerUser(loginDetails);
        res.json(isValidUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
