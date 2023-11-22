const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ status: "error", error: "Vui lòng nhập email và mật khẩu của bạn!" });
  else {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) throw err;
      if (!result.length || !await bcrypt.compare(password, result[0].password)) {
        return res.json({ status: "error", error: "Email hoặc mật khẩu không chính xác!" });
      } else {
        const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES
        });
        const cookieOptions = {
          expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000),
          httpOnly: true
        };
        res.cookie("userRegistered", token, cookieOptions);

        // Lấy tất cả thông tin người dùng từ cơ sở dữ liệu
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
          if (err) throw err;
          const user = result[0];
          // res.render('/', {user});
          return res.json({status: "success", success: "Bạn đã đăng nhập thành công!"});
        });
      }
    });
  }
};

module.exports = login;
