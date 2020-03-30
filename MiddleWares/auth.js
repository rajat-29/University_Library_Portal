function checkSession(req, res, next) {

  if(req.session.role == "Admin" || req.session.role == "Staff") {
    next();
  }
  else {
  	req.session.redirectUrl = req.originalUrl;
    res.redirect('/');
  }
}

function checkAdmin(req, res, next) {
    if (req.session.role == "Admin") {
        next();
    }
    else {
    	req.session.redirectUrl = req.originalUrl;
        res.redirect('/');
    }
}

function checkUser(req, res, next) {

    if(req.session.role == "User") {
    	next();
    }
  	else {
	  	req.session.redirectUrl = req.originalUrl;
	    res.redirect('/');
    }
}

module.exports.checkSession = checkSession;
module.exports.checkAdmin = checkAdmin;
module.exports.checkUser = checkUser;