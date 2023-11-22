const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const register = async (req, res) => {
  const { email, password: Npassword, name, address, phone } = req.body;
  if (!email || !Npassword || !name || !address || !phone) return res.json({ status: "error", error: "Vui lòng điền đầy đủ thông tin!" });
  else if(Npassword.length < 6) return res.json({ status: "error", error: "Mật khẩu phải dài hơn 6 ký tự" });
  else if(!isValidEmail(email)) return res.json({ status: "error", error: "Email bạn nhập không hợp lệ" })
  else if(phone.length != 10) return res.json({ status: "error", error: "Số điện thoại phải có 10 ký tự" })
  else {
    db.query("SELECT email FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) throw err;
      if (result[0]) return res.json({ status: "error", error: "Email đã tồn tại!" });
      else {
        const password = await bcrypt.hash(Npassword, 8);
        db.query("INSERT INTO users SET ?", { name: name, email: email, password: password, phone: phone, address: address }, (err, result) => {
          if (err) throw err;
          return res.json({ status: "success", success: "Bạn đã đăng kí thành công!" });
        });
      }
    });
  }
};
module.exports = register;
