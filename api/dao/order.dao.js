
class OrderDAO {
    static async  save(orders) {
        let params = [
            orders.userId,
            orders.productId,
            orders.qty,
            orders.totalAmount,
            orders.status,
            orders.created_date,
            orders.modified_date,
            orders.created_by,
            orders.modified_by,
        ];
        let ds = await sails.getDatastore();
        const sql = "insert into orders (user_id,product_id,qty,total_amount,status,created_date,modified_date,created_by,modified_by) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)";

        const result = await ds.sendNativeQuery(sql, params);
        // console.log(result, "id")
        return result.insertId;
    }
    static async findAll() {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(
            "select o.id,u.user_name,p.name,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id"
        );

        return result.rows;
    }

    static async findOneAndUpdate(orderId, status, userId) {
        let params = [status, userId, orderId];
        const sql =
            "UPDATE orders SET status=$1,modified_by=$2,modified_date=Now() where id=$3";
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    static async findOne(id) {
        let ds = await sails.getDatastore();

        const result = await ds.sendNativeQuery("select * from orders where id=$1", [id]);
        let data = result.rows;
        let order = data.length > 0 ? data[0] : null;
        return order;
    }

    static async cancelOrder(orderDetails) {
        let params = ["CANCELLED", orderDetails.userId, orderDetails.orderId];
        const sql =
            "UPDATE orders SET status=$1,modified_by=$2,modified_date=now() where id=$3";
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        let data = result.rows;

        return data;
    }

    static async findMyOrder(userId) {
        let params = [userId];
        const sql = "select o.id,u.user_name,p.name,(p.id)as product_id,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id AND o.user_id=$1";
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        let data = result.rows;
        return data;
    }

    static async myOrdersStatusCount(userId) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(
            "select status,count(*) as count from users u, products p,orders o where o.user_id=u.id AND o.product_id=p.id AND o.user_id=$1 group by status",
            [userId]
        );
        let data = result.rows;
        return data;
    }

    static async allTransactions(cancelledDate) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery("select * from transactions where transaction_date =$1", [cancelledDate]);
        let data = result.rows;
        return data[0];
    }

    static async refundWallet(updateBalances, transactionUserId) {
        let ds = await sails.getDatastore();
        let params = [updateBalances, transactionUserId]
        const result = await ds.sendNativeQuery("update wallet set balance =$1 where user_id =$2", [updateBalances, transactionUserId]);
        let data = result.rows;
        return data;
    }


}

module.exports = {
    save: OrderDAO.save,
    findAll: OrderDAO.findAll,
    findOneAndUpdate: OrderDAO.findOneAndUpdate,
    findOne: OrderDAO.findOne,
    cancelOrder: OrderDAO.cancelOrder,
    findMyOrder: OrderDAO.findMyOrder,
    myOrdersStatusCount: OrderDAO.myOrdersStatusCount,
    allTransactions: OrderDAO.allTransactions,
    refundWallet: OrderDAO.refundWallet,

}