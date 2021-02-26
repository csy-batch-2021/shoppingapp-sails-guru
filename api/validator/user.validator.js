const UserDAO = require("../dao/userdao");
const bcrypt = require("bcrypt");
const validator = require("email-validator");

class UserValidator {


    static async validateNewUser(user) {
        let regularExpression = /^[a-zA-Z]+$/;
        let nameValid = regularExpression.test(user.name);
        let emailVal = validator.validate(user.email);
        let regularExpressionPassword = /^[a-zA-Z0-9]+$/;
        let passwordValid = regularExpressionPassword.test(user.password);

        if (user.name == null || user.name == "") {
            throw new Error('Name cannot be empty');
        } else if (user.name.length < 3) {
            throw new Error('Name should be at least 3 characters');
        } else if (user.name.trim() == 0) {
            throw new Error('Name Must Contain Characters Only');
        } else if (nameValid == false) {
            throw new Error('Name Must Contain Characters Only');
        } else if (user.email == null || user.email == "" || user.email.trim() == 0) {
            throw new Error('Email cannot be empty');
        } else if (emailVal == false) {
            throw new Error('Invalid Email Format');
        } else if (user.password == null || user.password == "" || user.password.trim() == 0) {
            throw new Error('Password cannot be empty');
        } else if (user.password.length < 8) {
            throw new Error('password length should be at least 8 characters');
        } else if (passwordValid == false) {
            throw new Error('Password Should Contain Alphanumeric Characters Only');
        }
    }

    static async isvalidEmail(login) {
        if (login.email == null || login.email == "") {
            throw new Error('Email cannot be empty');
        }
        else if (login.email.trim() == 0) {
            throw new Error('Invalid Email Format');
        }
        let emailVal = validator.validate(login.email);
        if (emailVal == false) {
            throw new Error('Invalid Email Format');
        }
        else if (login.password == null || login.password == "" || login.password.trim() == 0) {
            throw new Error('Password cannot be empty');
        }
    }

    static async isEmailExists(usersList) {
        if (usersList == 0) {
            throw new Error('Email Does Not Exist');
        } else {
            return usersList;
        }
    }

    static async isUserLoginExists(userlogin) {
        if (!userlogin) {
            throw new Error('Invalid User Detail');
        } else {
            return userlogin;
        }
    }

    static async balanceValidator(bals, id) {
        if (id == null || id == "") {
            throw new Error('UserId cannot be empty');
        } else if (isNaN(id) || id.trim() == 0) {
            throw new Error('UserId is not a number');
        } else if (id <= 0) {
            throw new Error('Invalid UserId');
        } else if (bals == null || bals == "") {
            throw new Error('Balance cannot be empty');
        } else if (bals <= 0 || bals.trim() == 0) {
            throw new Error('Invalid Balance Amount');
        } else if (bals > 90000) {
            throw new Error('Add Below RS.90000')
        }
    }

    static async updatePasswordValid(oldPassword, newPassword) {
        let regularExpressionPassword = /^[a-zA-Z0-9]+$/;
        let passwordValid = regularExpressionPassword.test(newPassword);
        if (oldPassword == null || oldPassword == "") {
            throw new Error('oldPassword cannot be empty');
        } else if (oldPassword.trim() == 0) {
            throw new Error('Password Should Contain Alphanumeric Characters Only');
        } else if (newPassword == null || newPassword == "") {
            throw new Error('New Password cannot be empty');
        } else if (newPassword.length < 8) {
            throw new Error('New password length should be at least 8 characters');
        } else if (passwordValid == false || newPassword.trim() == 0) {
            throw new Error('New Password Should Contain Alphanumeric Characters Only');
        }
    }

    static async isUserExists(isUserIdExists) {
        if (!isUserIdExists) {
            throw new Error('Please Enter Valid UserID');
        }
        //    else {
        //     return isUserIdExists;
        // }
    }

    static async passwordMatch(oldPassword, existsPassword) {
        let hashPassword = await bcrypt.compare(oldPassword, existsPassword);
        if (hashPassword == false) {
            throw new Error('Old Password Incorrect');
        }

    }

    static async toCheckValidUserId(userId) {
        var result = await UserDAO.findOne(userId);
        if (!result) {
            throw new Error('Please Check User ID');
        }
    }

    static async validateUpdateUser(name, email) {
        let regularExpression = /^[a-zA-Z]+$/;
        let nameValid = regularExpression.test(name);
        let emailVal = validator.validate(email);

        if (name == null || name == "") {
            throw new Error('Name cannot be empty');
        } else if (name.length < 3) {
            throw new Error('Name should be at least 3 characters');
        } else if (name.trim() == 0) {
            throw new Error('Name Must Contain Characters Only');
        } else if (nameValid == false) {
            throw new Error('Name Must Contain Characters Only');
        } else if (email == null || email == "" || email.trim() == 0) {
            throw new Error('Email cannot be empty');
        } else if (emailVal == false) {
            throw new Error('Invalid Email Format');
        }
    }

}

module.exports = {
    validateNewUser: UserValidator.validateNewUser,
    isvalidEmail: UserValidator.isvalidEmail,
    isEmailExists: UserValidator.isEmailExists,
    isUserLoginExists: UserValidator.isUserLoginExists,
    balanceValidator: UserValidator.balanceValidator,
    updatePasswordValid: UserValidator.updatePasswordValid,
    isUserExists: UserValidator.isUserExists,
    passwordMatch: UserValidator.passwordMatch,
    updatePassword: UserValidator.updatePassword,
    toCheckValidUserId: UserValidator.toCheckValidUserId,
    validateUpdateUser: UserValidator.validateUpdateUser,

}
