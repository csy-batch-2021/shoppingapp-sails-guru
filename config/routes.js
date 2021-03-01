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
  "get /allProducts": { view: "pages/allProducts" },
  "get /myOrders": { view: "pages/myOrders" },
  "get /orders": { view: "pages/orders" },
  "get /products": { view: "pages/products" },
  "get /editPage": { view: "pages/editPage" },
  "get /transactions": { view: "pages/transactions" },
  "get /myTransactions": { view: "pages/myTransactions" },


  //REST API

  /**
   * This API is used to Get All Users list from Users table. 
  */
  "GET /api/userLists": { action: "users/users-list" },

  /**
   * This API is used to Get All Wallet Balance from Wallet table.
  */
  "GET /api/walletBalance": { action: "users/wallet" },

  /**
  * This API is used to List All User Transaction from Transaction table by Grouping function.
 */
  "GET /api/transactions": { action: "users/transaction-list" },

  /**
   * This API is used to List All Products from Product table.
  */
  "GET /api/products": { action: "product/list" },

  /**
    * This API is used to List One User Orders from Orders table.
   */
  "GET /api/myOrders": { action: "order/my-orders" },

  /**
   * This API is used to Get The Counts of the Orders (DELIVERY/CANCEL).
  */
  "GET /api/orderStatusCount": { action: "order/my-orders-count" },

  /**
   *  This API is used to Register as new User and Admin.
  */
  "POST /api/register": { action: "users/register" },

  /**
   *  This API is used to Login as a User and Admin.
  */
  "POST /api/login": { action: "users/login" },

  /**
   * This API is used to List All Orders from Orders table.
  */
  "POST /api/addOrder": { action: "order/add-order" },

  /**
   * This API is used to Change The Order Status (DELIVERY/CANCEL). 
  */
  "POST /api/changeorderstatus": { action: "order/change-order-status" },

  /**
   * This API is used to Change The User Password.
  */
  "PATCH /api/changeUserPassword": { action: "users/change-password" },

  /**
   * This API is used to Add Balance in Wallet. 
  */
  "PATCH /api/addBalance": { action: "users/update-wallet" },

  /**
   * This API is used to Update The User Profile Name and Email.
  */
  "PATCH /api/updateProfile": { action: "users/edit-profile" },

  /**
   * This API is used to List One User Transaction List from Tansaction table and Order table.
  */
  "PATCH /api/myTransactions": { action: "users/mytransaction-list" },

  /**
   * This API is used to Cancel a Order.
  */
  "PATCH /api/order/:id/cancel": { action: "order/cancel-order" },


  // "GET /api/product/search": { action: "product/search-product" },
  // "GET /api/orders": { action: "order/all-order" },
  // "GET /api/getAllProducts": { action: "product/get-all-products" },
  // "POST /api/product/addRating": { action: "product/add-product-rating" },
  // "get /api/users": { action: "users/login" },




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
