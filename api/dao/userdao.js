class UserDAO {

    static async save(user, hash) {
        let role = user.role != "" && user.role != null ? user.role : "USER";
        let ds = await sails.getDatastore();
        let params = [user.name, user.email, hash, role];
        let sql = "insert into users (user_name,email,password,role,active) values ($1,$2,$3,$4,1)";
        let result = await ds.sendNativeQuery(sql, params);
        return result;
    }

    static async findByEmail(email) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("select 1 from users where email=$1", [email]);
        let data = result.rows;
        return data.length != 0;
    }

    static async createWalletAccount(userId) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("insert into wallet(user_id,balance) values ($1,0)", [userId]);
        let data = result.rows;
        return data;
    }

    static async findOne(id) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("select * from users where id=$1", [id]);
        let data = result.rows;
        return data[0];
    }

    static async findUser(email) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("select * from users where email=$1", [email]);
        let data = result.rows;
        return data;
    }

    static async findWalletUserId(id) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("select * from wallet where user_id=$1", [id]);
        let data = result.rows;
        return data[0];
    }

    static async addWalletBalance(bals, id) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("update wallet set balance =$1 where user_id =$2", [bals, id]);
        let data = result.rows;
        return data;
    }

    static async updatePassword(hash, userId) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("update users set password =$1 where id= $2", [hash, userId]);
        return result.affectedRows;
    }

    static async userFullList() {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("select u.id, user_name, email, role, balance from users u right join wallet w on(u.id = w.user_id)");
        let data = result.rows;
        return data;
    }

    // module.exports = {
    //     usersList: async function usersList() {
    //         let ds = await sails.getDatastore();
    //         let result = await ds.sendNativeQuery("select * from users");
    //         // console.log(result);
    //         let data = result.rows;
    //         console.log(data);
    //         return data;
    //     },
    // };

}

module.exports = {
    save: UserDAO.save,
    findByEmail: UserDAO.findByEmail,
    createWalletAccount: UserDAO.createWalletAccount,
    findUser: UserDAO.findUser,
    findOne: UserDAO.findOne,
    findWalletUserId: UserDAO.findWalletUserId,
    addWalletBalance: UserDAO.addWalletBalance,
    updatePassword: UserDAO.updatePassword,
    userFullList: UserDAO.userFullList,

}