const mongoose = require('mongoose');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');

async function push(req, res, name, email, password) {
    try {
        console.log(name, email, password);
        let finde = await usermodel.findOne({ email: email });

        if (finde) {
            console.log("Account already exists, bhai!");
            req.flash('error_msg', 'Account already exists. Please log in.');
            return res.redirect("/login"); // redirect to login with flash message
        } else {
            const salt = await bcrypt.genSalt(5);
            const hash = await bcrypt.hash(password, salt);
            console.log("Hashed Password:", hash);

            let user = await usermodel.create({
                name: name,
                email: email,
                password: hash,
            });

            res.cookie("email", user.email);
            req.flash('success_msg', 'Registration successful! Welcome.');
            return res.redirect("/home");
        }

    } catch (err) {
        console.log("Error:", err.message);
        req.flash('error_msg', 'Registration failed. Please try again.');
        return res.redirect("/register");
    }
}

module.exports = push;
