
const auth = (req, res, next) => {
    if (!req.cookies.email || req.cookies.email == 0) {
        res.redirect("/login");
        console.log("pleas login sir")
    } else {
        next();
    }
};
module.exports = auth