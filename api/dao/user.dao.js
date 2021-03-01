class UserDAO {

    static async save(user, hash) {
        let role = user.role != "" && user.role != null ? user.role : 'USER';
        let ds = await sails.getDatastore();
        let params = [user.name, user.email, hash, role];
        let sql = 'INSERT INTO users (user_name,email,password,role,active) VALUES ($1,$2,$3,$4,1)';
        let result = await ds.sendNativeQuery(sql, params);
        return result.insertId;
    }

    static async findByEmail(email) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT 1 FROM users WHERE email=$1', [email]);
        let data = result.rows;
        return data[0];
    }

    static async createWalletAccount(userId) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('INSERT INTO wallet(user_id,balance) VALUES ($1,0)', [userId]);
        return result.rows;
    }

    static async findOne(id) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT * FROM users WHERE id=$1', [id]);
        let data = result.rows;
        return data[0];
    }

    static async findUser(email) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT * FROM users WHERE email=$1', [email]);
        return result.rows;
    }

    static async findWalletUserId(id) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT * from wallet WHERE user_id=$1', [id]);
        let data = result.rows;
        return data[0];
    }

    static async addWalletBalance(bals, id) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('UPDATE wallet SET balance = balance + $1 WHERE user_id =$2', [bals, id]);
        return result.rows;
    }

    static async updatedWalletBalance(bals, id) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('UPDATE wallet SET balance = $1 WHERE user_id =$2', [bals, id]);
        return result.rows;
    }

    static async updatePassword(hash, userId) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('UPDATE users SET password =$1 WHERE id= $2', [hash, userId]);
        return result.affectedRows;
    }

    static async userFullList() {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT u.id, user_name, email, role, balance FROM users u right join wallet w on(u.id = w.user_id)');
        return result.rows;
    }

    static async transactionList(walletId, amount, transaction_date, comments) {
        let ds = await sails.getDatastore();
        let transaction_type = 'DEBIT';
        let status = 'SUCCESS';
        let params = [walletId, amount, transaction_type, status, transaction_date, comments];
        let sql = 'INSERT INTO transactions(account_id,amount,transaction_type,status,transaction_date,comments) VALUES ($1,$2,$3,$4,$5,$6)';
        let result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }


    static async refundStatus(transactionList) {
        let ds = await sails.getDatastore();
        let transaction_date = new Date();
        let transaction_type = 'CREDIT';
        let comments = 'Refunded # ' + transactionList.id;
        let params = [transactionList.account_id, transactionList.amount, transaction_type, transactionList.status, transaction_date, comments];
        let sql = 'INSERT INTO transactions(account_id,amount,transaction_type,status,transaction_date,comments) VALUES ($1,$2,$3,$4,$5,$6)';
        let result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }

    static async updateUser(userId, name, email) {
        try {
            let ds = await sails.getDatastore();
            let result = await ds.sendNativeQuery('UPDATE users SET user_name =$1, email =$2 WHERE id =$3', [name, email, userId]);
            return result.rows;
        } catch (error) {
            throw new Error('Mail Already Exists')
        }

    }


    static async transactions() {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT t.account_id,u.email,sum(amount) as Total_Amount FROM transactions t join users u on (t.account_id = u.id) WHERE transaction_type = "DEBIT" group by u.id');
        return result.rows;
    }

    static async myTransactions(userId) {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT * FROM transactions WHERE account_id = (SELECT id FROM wallet WHERE user_id =$1)', [userId]);
        return result.rows;
    }

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
    transactionList: UserDAO.transactionList,
    updatedWalletBalance: UserDAO.updatedWalletBalance,
    refundStatus: UserDAO.refundStatus,
    updateUser: UserDAO.updateUser,
    transactions: UserDAO.transactions,
    myTransactions: UserDAO.myTransactions,

}