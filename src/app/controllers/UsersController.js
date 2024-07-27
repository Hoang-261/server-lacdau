const User = require("../controllers/models/User");
const loginRegisterService = require("../../service/loginRegisterService");
class UsersController {
  //[GET] /test
  index(req, res, next) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => next(err));
  }

  //[POST] /users
  post = async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.phone || !req.body.password) {
        return res.status(200).json({
          EM: "missing required parameters",
          EC: "1",
          DT: "",
        });
      }

      //service: created user
      let data = await loginRegisterService.registerNewUser(req.body);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: "",
      });
    } catch (e) {
      return res.status(500).json({
        EM: "error from server",
        EC: "-1",
        DT: "",
      });
    }
  };

  //[POST] //login
  login = async (req, res, next) => {
    console.log(">>>>>>>>>>>> login");
    try {
      if (!req.body.valueLogin || !req.body.password) {
        return res.status(200).json({
          EM: "missing required parameters",
          EC: "1",
          DT: "",
        });
      }

      //service: login user
      let data = await loginRegisterService.loginUser(req.body);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (e) {
      return res.status(500).json({
        EM: "error from server",
        EC: "-1",
        DT: "",
      });
    }
  };
}
module.exports = new UsersController();
