const ProductService = require("../../services/product.service");

module.exports = async function getActiveProductsList(req, res) {
    try {
        let activeProducts = await ProductService.getActiveProduct();
        res.json(activeProducts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
