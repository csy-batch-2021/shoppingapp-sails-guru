const ProductService = require("../../services/product.service");

module.exports = async function addProductRating(req, res) {
    let productRatingDetails = req.body;
    console.log('productRatingDetails', productRatingDetails);
    try {
        let productsRating = await ProductService.addProductRating(productRatingDetails);
        res.json(productsRating);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}