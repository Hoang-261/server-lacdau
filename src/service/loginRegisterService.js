const User = require("../app/controllers/models/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  const hashPassword = bcrypt.hashSync(userPassword, salt);
  console.log("hashPassword :", hashPassword);
  return hashPassword;
};

const checkEmail = async (userEmail) => {
  console.log("check email");
  const user = await User.findOne({ email: userEmail });
  if (user) {
    return true;
  }
  return false;
};

const checkPhone = async (userPhone) => {
  const user = await User.findOne({ phone: userPhone });
  if (user) {
    return true;
  }
  return false;
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
const loginUser = async (rawUserData) => {
  try {
    const user = await User.findOne({
      $or: [
        {
          email: rawUserData.valueLogin,
        },
        {
          phone: rawUserData.valueLogin,
        },
      ],
    });
    if (user) {
      let isCorrectPassword = checkPassword(
        rawUserData.password,
        user.password
      );
      if (isCorrectPassword) {
        return {
          EM: "Đăng nhập thành công",
          EC: "0",
          DT: "",
        };
      }
    }

    return {
      EM: "tên đăng nhập hoặc mật khẩu không đúng",
      EC: "1",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs in service",
      EC: "-1",
      DT: "",
    };
  }
};
const registerNewUser = async (rawUserData) => {
  try {
    let checkemail = await checkEmail(rawUserData.email);

    if (checkemail) {
      console.log("Email is already exist");
      return {
        EM: "Email is already exist",
        EC: "1",
      };
    }

    let checkphone = await checkPhone(rawUserData.phone);
    if (checkphone) {
      console.log("phone is already exist");
      return {
        EM: "Phone is already exist",
        EC: "1",
      };
    }
    //hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    //create
    const user = new User({
      email: rawUserData.email,
      phone: rawUserData.phone,
      password: hashPassword,
    });
    user.save();
    return {
      EM: "created user successfully",
      EC: "0",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs in service",
      EC: "-1",
    };
  }
};

module.exports = { registerNewUser, loginUser };
