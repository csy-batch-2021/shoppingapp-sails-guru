const UserService = require("../../services/user.service");

module.exports = async function loginUser(req, res) {
  console.log('loginDetails', req.body);
  try {
    let loginDetails = req.body;
    let isValidUser = await UserService.userLogin(loginDetails);
    res.json(isValidUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

