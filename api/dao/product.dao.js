class ProductDAO {

    static async findOne(id) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('select * from products where id=$1', [id]);
        let data = result.rows;
        return data.length > 0 ? data[0] : null;
    }

    static async getAllProducts() {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('select * from products');
        return result.rows;
    }

    static async searchProducts(brandName) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('select * from products where brand_name IN($1)', [brandName]);
        return result.rows;
    }

    static async findActive() {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('select * from products where active =1');
        return result.rows;
    }

}


module.exports = {
    getAllProducts: ProductDAO.getAllProducts,
    findOne: ProductDAO.findOne,
    searchProducts: ProductDAO.searchProducts,
    findActive: ProductDAO.findActive

}
