function checkAuth(req, res) {
    if(req.session.isLoggedIn) next()

    else{
        req.session.redirectUrl = req.url
        res.redirect('/users/login')
    }
}

module.exports = {
    checkAuth
}