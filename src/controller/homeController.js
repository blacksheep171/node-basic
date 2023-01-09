import connection from "../configs/connectDB";

let getHomepage = (req, res) => {
    // logic 
    // return res.render('test/index.ejs');
    let data = [];
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
            results.map((row) => {
                data.push({
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                    address: row.address
                })
            })
            return res.render('index.ejs', {dataUser:data});
        });
      
}

module.exports = {
    getHomepage
}