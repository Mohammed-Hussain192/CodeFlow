const mongoose = require('mongoose');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');

async function check(req, res, email, password) {
    try {
        console.log(email, password);

        const findmail = await usermodel.findOne({ email: email });

        if (!findmail) {
            console.log("email not found");
            req.flash('error_msg', 'Email not registered. Please register first.');
            return res.redirect("/register");
        }

        const isMatch = await bcrypt.compare(password, findmail.password);

        if (isMatch) {
            res.cookie("email", findmail.email);
            req.flash('success_msg', 'Login successful! Welcome back.');
            return res.redirect("/home");
        } else {
            console.log("invalid password");
            req.flash('error_msg', 'Invalid password. Please try again.');
            return res.redirect("/login");
        }

    } catch (err) {
        console.log(err.message);
        req.flash('error_msg', 'Something went wrong. Please try again later.');
        return res.redirect("/login");
    }
}

module.exports = check;
