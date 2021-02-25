const UserService = require("../../services/user.service");

// module.exports = async function users(req, res) {
//   try {
//     let isValidUser = await UserService.users();
//     res.json(isValidUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

module.exports = async function loginUser(req, res) {
  try {
    let loginDetails = req.body;
    let isValidUser = await UserService.userLogin(loginDetails);
    res.json(isValidUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// module.exports = async function login(req, res) {
//   let { email, password } = req.body;
//   console.log(email, password);
//   try {
//     let loginDetails = req.body;
//     let isValidUser = await UserService.UserService.userLogin(loginDetails);
//     res.json(isValidUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

