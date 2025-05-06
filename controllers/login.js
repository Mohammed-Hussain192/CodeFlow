const mongoose = require('mongoose');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');

async function check(req, res, email, password) {
    try {
        console.log(email, password);

        const findmail = await usermodel.findOne({ email: email });

        if (!findmail) {
            console.log("email not found");
            return res.redirect("/register");
        }

        const isMatch = await bcrypt.compare(password, findmail.password);

        if (isMatch) {
            res.cookie("email", findmail.email);
            return res.redirect("/home");
        } else {
            console.log("invalid password");
            return res.redirect("/login");
        }

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = check;
