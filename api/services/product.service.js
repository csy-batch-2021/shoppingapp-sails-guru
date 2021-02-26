const ProductDAO = require("../dao/product.dao");
const UserValidator = require("../validator/user.validator");
const ProductValidator = require("../validator/productValidator");
const ProductRatingDAO = require("../dao/productRating.dao");

class ProductService {
    static async getAllProducts() {
        try {
            return await ProductDAO.getAllProducts();
        } catch (err) {
            console.log(err);
            throw new Error("Not able to fetch the products");
        }
    }
    // to find and get particular order
    static async getProductDetails(productId) {
        try {
            var result = await ProductDAO.findOne(productId);
            if (!result) {
                throw new Error("Please enter valid Prodct Id");
            }
            return result;
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

    static async searchProducts(brandNames) {
        try {
            return await ProductDAO.searchProducts(brandNames);
        } catch (err) {
            console.log(err);
            throw new Error("Not able to fetch the products");
        }
    }
    // to get all products
    static async getActiveProduct(params) {
        try {
            return await ProductDAO.findActive();
        } catch (err) {
            throw new Error("Not able to fetch active products");
        }
    }
    static async addProductRating(productRatingDetails) {
        console.log("productRatingDetails", productRatingDetails);

        try {
            await UserValidator.toCheckValidUserId(productRatingDetails.userId);
            await ProductValidator.toCheckValidProductId(productRatingDetails.productId);
            productRatingDetails.created_by = productRatingDetails.userId;
            productRatingDetails.modified_by = productRatingDetails.userId;
            return await ProductRatingDAO.save(productRatingDetails);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}
module.exports = {
    getAllProducts: ProductService.getAllProducts,
    getProductDetails: ProductService.getProductDetails,
    searchProducts: ProductService.searchProducts,
    getActiveProduct: ProductService.getActiveProduct,
    addProductRating: ProductService.addProductRating
}