const User = require("./models/User");

class SiteController {
  //[GET] /news
  news(req, res, next) {
    res.render("news");
  }

  //[GET] /
  home(req, res, next) {
    res.render("home");
  }

  //[GET] /search
  search(req, res, next) {
    console.log(req.query.q);
    res.render("search");
  }
}
module.exports = new SiteController();
