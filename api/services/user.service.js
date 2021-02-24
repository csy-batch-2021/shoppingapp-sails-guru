const UserDAO = require("../dao/userdao");
const UserValidator = require("./user.validator");
const bcrypt = require("bcrypt");

class UserService {

  static async registerUser(user) {
    try {
      await UserValidator.validateNewUser(user);
      let exists = await UserDAO.findByEmail(user.email);
      if (exists) {
        throw new Error("Mail Already exists");
      } else {
        await bcrypt.hash(user.password, 10, (err, hash) => {
          UserDAO.save(user, hash).then((res) => {
            let userID = res.insertId;
            UserDAO.createWalletAccount(userID);
          });
        });
        return "User Added Successfully";
      }
    } catch (error) {
      throw error;
    }
  }


  static async userLogin(loginDetails) {
    try {
      await UserValidator.isvalidEmail(loginDetails);
      console.log(loginDetails);
      let usersList = await UserDAO.findUser(loginDetails.email);
      await UserValidator.isEmailExists(usersList);
      let userRole = loginDetails.role != null ? loginDetails.role : "USER";
      let userlogin = usersList.find((u) => u.role == userRole);
      await UserValidator.isUserLoginExists(userlogin);
      let hashPassword = await bcrypt.compare(
        loginDetails.password,
        userlogin.password
      );
      if (!userlogin || hashPassword == false) {
        throw new Error("Invalid User Detail");
      } else {
        delete userlogin.password;
        return userlogin;
      }
    } catch (error) {
      throw error;
    }
  }

  static async addBalance(bals, id) {
    try {
      await UserValidator.balanceValidator(bals, id);
      let wallet = await UserDAO.findWalletUserId(id);
      if (!wallet) {
        throw new Error("User Id Not Found");
      } else {
        await UserValidator.balanceValidator(bals, id);
        await UserDAO.addWalletBalance(bals, id);
        return "Balance Updated";
      }
    } catch (error) {
      throw error;
    }
  }

  static async walletBalance(userId) {
    try {
      let result = await UserDAO.findWalletUserId(userId);
      if (!result) {
        throw new Error("Invalid User Detail");
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async passwordUpdate(userId, oldPassword, newPassword) {
    try {
      // console.log(updateUserPassword, "passs")
      console.log(oldPassword, newPassword);
      await UserValidator.updatePasswordValid(oldPassword, newPassword);
      let user = await UserDAO.findOne(userId);
      await UserValidator.isUserExists(user);
      // let hashPassword = await bcrypt.compare(oldPassword, isUserIdExists.password);
      await UserValidator.passwordMatch(oldPassword, user.password);
      await bcrypt.hash(newPassword, 10, (err, hash) => {
        UserDAO.updatePassword(hash, userId)
      });
      return "Password Successfully Changed";
    } catch (error) {
      throw error;
    }
  }

  static async userLists() {
    let userList = await UserDAO.userFullList();
    return userList;
  }

}

module.exports = {
  registerUser: UserService.registerUser,
  userLogin: UserService.userLogin,
  addBalance: UserService.addBalance,
  walletBalance: UserService.walletBalance,
  passwordUpdate: UserService.passwordUpdate,
  userFullList: UserService.userLists,

}

