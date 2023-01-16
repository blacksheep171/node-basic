import pool from "../configs/connectDB";

let getHomepage =  async (req, res) => {

        const [rows, fields] = await pool.execute('SELECT * FROM `users`');

        let check = await pool.execute('SELECT * FROM `users`');

        console.log(check[0]);

        return res.render('index.ejs', {dataUser: rows, title : 'Users Details'});

}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let [user] =  await pool.execute('SELECT * FROM `users` where id = ?', [id]);

    console.log('>>>> check req params', user);
    return res.send(JSON.stringify(user))
}

let createUser = async (req, res) => {
    // console.log(">>> check request: ", req.body);
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
    return res.redirect('/');
}

module.exports = {
    getHomepage, getDetailPage, createUser
}