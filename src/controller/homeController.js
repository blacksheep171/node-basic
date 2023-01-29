import pool from "../configs/connectDB";
import multer from 'multer';

let getHomepage =  async (req, res) => {

        const [rows, fields] = await pool.execute('SELECT * FROM `users`');

        let check = await pool.execute('SELECT * FROM `users`');

        return res.render('index.ejs', {dataUser: rows, title : 'Users Details'});

}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] =  await pool.execute('select * from `users` where id = ?', [userId]);

    return res.send(JSON.stringify(user))
}

let createUser = async (req, res) => {
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('insert into `users`(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
    return res.redirect('/');
}

let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] =  await pool.execute('select * from `users` where id = ?', [id]);

    return res.render('update.ejs', {dataUser: user[0]});
}

let updateUser = async (req, res) => {

    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute('update users set firstName = ? , lastName = ? , email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs');
}
 

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/');
}

const upload = multer().single('profile_image');

let handleUploadFile = async (req, res) => {
    
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

module.exports = {
    getHomepage, getDetailPage, createUser, editUser, updateUser, deleteUser, getUploadFilePage, handleUploadFile
}