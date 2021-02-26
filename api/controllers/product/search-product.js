const ProductService = require("../../services/product.service");

module.exports = async function searchProducts(req, res) {
    try {
        let brandNameValues = req.query.brandName.split(',');
        let products = await ProductService.searchProducts(brandNameValues);
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}