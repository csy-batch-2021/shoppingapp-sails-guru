const ProductService = require("../../services/product.service");

module.exports = async function getProducts(req, res) {
    try {
        let products = await ProductService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}