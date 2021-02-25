const UserValidator = require("../validator/user.validator");

module.exports = async function (req, res, proceed) {
  let loggedInUserId = req.query.loggedInUserId;
  console.log("isLoggedIn policy invoked - LoggedInUserId:", loggedInUserId);
  if (loggedInUserId) {
    try {
      await UserValidator.toCheckValidUserId(loggedInUserId);
      req.me = loggedInUserId;
      return proceed();
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};