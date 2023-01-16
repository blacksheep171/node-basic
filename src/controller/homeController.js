import pool from "../configs/connectDB";

let getHomepage =  async (req, res) => {

        const [rows, fields] = await pool.execute('SELECT * FROM `users`');

        let check = await pool.execute('SELECT * FROM `users`');

        console.log(check[0]);

        return res.render('index.ejs', {dataUser: rows, title : 'Users Details'});

}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] =  await pool.execute('select * from `users` where id = ?', [userId]);

    console.log('>>>> check req params', user);
    return res.send(JSON.stringify(user))
}

let createUser = async (req, res) => {
    // console.log(">>> check request: ", req.body);
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('insert into `users`(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
    return res.redirect('/');
}

let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] =  await pool.execute('select * from `users` where id = ?', [id]);

    console.log('>>> check user', [user]);

    return res.render('update.ejs', {dataUser: user[0]});
}

let updateUser = async (req, res) => {


    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute('update users set firstName = ? , lastName = ? , email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    // console.log('>>> check req user', req.body);
    return res.redirect('/');

    // return res.send("hello update user");
}


let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/');
}

module.exports = {
    getHomepage, getDetailPage, createUser, editUser, updateUser, deleteUser
}