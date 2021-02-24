/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  "get /login": { view: "pages/login" },
  "get /register": { view: "pages/register" },
  "get /adminRegister": { view: "pages/adminRegister" },
  "get /userList": { view: "pages/userList" },
  "get /updatePassword": { view: "pages/updatePassword" },
  "get /wallet": { view: "pages/wallet" },
  "get /products": { view: "pages/products" },


  //REST API
  "post /api/login": { action: "users/login" },
  "post /api/register": { action: "users/register" },
  "get /api/users": { action: "users/login" },
  "get /api/userLists": { action: "users/users-list" },
  "patch /api/addBalance": { action: "users/update-wallet" },
  "get /api/walletBalance": { action: "users/wallet" },
  "patch /api/changeUserPassword": { action: "users/change-password" }




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
