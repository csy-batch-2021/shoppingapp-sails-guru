const UserDAO = require("../dao/userdao");
const UserValidator = require("../validator/user.validator")
const bcrypt = require("bcrypt");

class UserService {

  static async registerUser(user) {
    try {
      await UserValidator.validateNewUser(user);
      let exists = await UserDAO.findByEmail(user.email);
      if (exists) {
        throw new Error('Mail Already exists');
      } else {
        await bcrypt.hash(user.password, 10, (err, hash) => {
          UserDAO.save(user, hash).then((res) => {
            let walletId = res.insertId;
            UserDAO.createWalletAccount(walletId);
          });
        });
        return 'User Added Successfully';
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  static async userLogin(loginDetails) {
    try {
      await UserValidator.isvalidEmail(loginDetails);
      console.log(loginDetails);
      let usersList = await UserDAO.findUser(loginDetails.email);
      await UserValidator.isEmailExists(usersList);
      let userRole = loginDetails.role != null ? loginDetails.role : 'USER';
      let userlogin = usersList.find((u) => u.role == userRole);
      await UserValidator.isUserLoginExists(userlogin);
      let hashPassword = await bcrypt.compare(
        loginDetails.password,
        userlogin.password
      );
      if (!userlogin || hashPassword == false) {
        throw new Error('Invalid User Detail');
      } else {
        delete userlogin.password;
        return userlogin;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addBalance(bals, id) {
    try {
      await UserValidator.balanceValidator(bals, id);
      let wallet = await UserDAO.findWalletUserId(id);
      if (!wallet) {
        throw new Error('User Id Not Found');
      } else {
        await UserValidator.balanceValidator(bals, id);
        await UserDAO.addWalletBalance(bals, id);
        return 'Balance Updated';
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async walletBalance(userId) {
    try {
      let result = await UserDAO.findWalletUserId(userId);
      if (!result) {
        throw new Error('Invalid User Detail');
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async passwordUpdate(userId, oldPassword, newPassword) {
    try {
      await UserValidator.updatePasswordValid(oldPassword, newPassword);
      let user = await UserDAO.findOne(userId);
      await UserValidator.isUserExists(user);
      await UserValidator.passwordMatch(oldPassword, user.password);
      await bcrypt.hash(newPassword, 10, (err, hash) => {
        UserDAO.updatePassword(hash, userId)
      });
      return 'Password Successfully Changed';
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async userLists() {
    try {
      return await UserDAO.userFullList();
    } catch (error) {
      throw new Error('Not Able To Fetch User List')
    }
  }

  static async updateUser(userId, name, email) {
    try {
      await UserValidator.validateUpdateUser(name, email);
      let user = await UserDAO.findOne(userId);
      await UserDAO.updateUser(user.id, name, email);
    } catch (error) {
      console.log(error);
      throw error;

    }
  }

  static async transactionFullList() {
    try {
      return await UserDAO.transactions();
    } catch (error) {
      throw new Error('Not Able To Fetch All Transaction List')
    }
  }

  static async myTransactionFullList(userId) {
    try {
      return await UserDAO.myTransactions(userId);
    } catch (error) {
      throw new Error('Not Able To Fetch Transaction List')
    }
  }

}

module.exports = {
  registerUser: UserService.registerUser,
  userLogin: UserService.userLogin,
  addBalance: UserService.addBalance,
  walletBalance: UserService.walletBalance,
  passwordUpdate: UserService.passwordUpdate,
  userFullList: UserService.userLists,
  updateUser: UserService.updateUser,
  transactionFullList: UserService.transactionFullList,
  myTransactionFullList: UserService.myTransactionFullList,
}

