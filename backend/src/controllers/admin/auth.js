const db = require("../../../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer  = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //cb(null, '../uploads/users')  // live path
        cb(null, '../admin/public/uploads/users')  // local path   
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        cb(null, Date.now() + path.extname(file.originalname))

        // You could use the original name
        // cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

exports.signup = (req, res) => {
    
    /* if(!req.body.email){
        return res.status(202).json({ message: "Email is Required." });
    }
    if(!req.body.password){
        return res.status(202).json({ message: "Password is Required." });
    } */
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const query = "INSERT INTO tbl_users (first_name, last_name, email, mobile_number, password, role, status, deleted, registered_date, last_logged_in) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = ['Super Admin', 'Admin', 'superadmin@yopmail.com', 0, hashedPassword, 1, 'Active', 0, '2024-12-22T18:30:00.000Z', '2024-12-22T21:50:09.000Z'];
    
    db.query(query, values, function (error, result) {

        if (error) {
            return res.status(202).json({
                message: 'error occured'
            });
        }

        if (result) {
            return res.status(200).json({
                message: "Registered Successfully"
            })
        }
    });
}

exports.signin = (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    // db.query("SELECT * FROM tbl_users WHERE email = ?", email, function (error, result) {
    // Change this line in your controller:
    db.query("SELECT * FROM tbl_users WHERE email = ?", [email], function (error, result) {
    
        if (error) {
            return res.status(202).json({ message: error });
        }

        if (result[0]) {

            var user = result[0];
            var data = bcrypt.compareSync(password, user.password);
            
            if (data) {
                const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.cookie("token", token, { expiresIn: "1d" });
                res.status(200).json({
                    token,
                    user: user,
                    role: user.role,
                    message : "Logged in successfully"
                });
            } else {
                return res.status(202).json({
                    message: "Invalid Password"
                });
            }

        } else {
            return res.status(202).json({
                message: "User not registered with us."
            });
        }
    })

}

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...!",
    });
};

exports.getUsers = (req, res) => {
    
    let query = `select * from tbl_users where role=2 order by id desc`;
    
    db.query(query, function (err, result) {
        if (err) {
            return res.status(500).json({ message: err });
        }
        return res.status(200).json({
            users: result
        });
    });

}

exports.getEnquires = (req, res) => {
    
    let query = `select * from tbl_enquiries order by id desc`;
    
    db.query(query, function (err, result) {
        if (err) {
            return res.status(500).json({ message: err });
        }
        return res.status(200).json({
            users: result
        });
    });

}

exports.getCustomerGrivances = (req, res) => {
    
    let query = `select * from tbl_customer_griviance order by id desc`;
    
    db.query(query, function (err, result) {
        if (err) {
            return res.status(500).json({ message: err });
        }
        return res.status(200).json({
            users: result
        });
    });

}

exports.getJobapplications = (req, res) => {
    
    let query = `select * from tbl_job_applications order by id desc`;
    
    db.query(query, function (err, result) {
        if (err) {
            return res.status(500).json({ message: err });
        }
        return res.status(200).json({
            users: result
        });
    });

}

exports.sendEmail = (req, res) => {
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_USER, // your gmail address
            pass: process.env.GMAIL_PASSWORD  // your gmail app password
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: req?.to_email, // recipient email
        subject: req?.subject,
        // text: "hello world", // plain text body
        html: req?.email_body // optional
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            // console.log('error: ', error);
            return res.status(500).json({ message: error.toString() });
        } else {
            // console.log('info: ', info);
            return res.status(200).json({ message: "Email sent successfully", info: info });
        }
    });
    /* return res.status(200).json({
        users: "in"
    }); */
    
}



