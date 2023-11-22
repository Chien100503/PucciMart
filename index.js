const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
// const router = require("./routes/pages");
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
// app.use("/js", express.static(__dirname + "./public/js"))
// app.use("/js", express.static(__dirname + "./public/css"))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());

//connect database connect
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");
});


// User
// Get users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
      if (err)
          res.send(err);
      else
          res.send(result);
  })
});

//Post user
app.post('/users', (req, res) => {
    let data = req.body;
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;
    let sql = "INSERT INTO users SET ?";
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Insert success!" });
  });
})

//Update user
app.put('/users/:id', (req, res) => {
  let data = req.body;
  let userId = req.params.id;
  let sql = "UPDATE users SET ? WHERE id = ?";
  db.query(sql, [data, userId], (err, response) => {
    if (err) throw err;
    res.json({ message: "Update success!" });
  });
})


//Delete user
app.delete('/users/:id', (req,res)=>{
  let user_id = req.params.id;
  db.query("DELETE from users where id = "+user_id,(err,result)=>{
      if(err){
          throw err;
      }else{
          res.json({ message: "Delete success!" });
      }
  });
})

//Get user with email


//Get product
app.get('/product', (req, res) => {
  db.query('SELECT * FROM product', (err, result) => {
      if (err)
          res.send(err);
      else
          res.send(result);
  })
});

//Post product
// app.post('/product', (req, res) => {
//     let data = req.body;
//     let sql = "INSERT INTO product SET ?";
//     db.query(sql, [data], (err, response) => {
//       if (err) throw err;
//       res.json({ message: "Insert success!" });
//   });
// })
app.post("/product", (req, res) => {
  const { type, name, img, price } = req.body;
  const query = `INSERT INTO product(type, name, img, price) VALUES ('${type}', '${name}', '${img}', ${price})`;
  
  db.query(query, (err) => {
    if (err) throw err;
    res.json({ message: "Insert success!" });
  });
});  

//Update product
app.put('/product/:id', (req, res) => {
  let data = req.body;
  let userId = req.params.id;
  let sql = "UPDATE product SET ? WHERE id = ?";
  db.query(sql, [data, userId], (err, response) => {
    if (err) throw err;
    res.json({ message: "Update success!" });
  });
})


//Delete product
app.delete('/product/:id', (req,res)=>{
  let product_id = req.params.id;
  db.query("DELETE from product where id = "+product_id,(err,result)=>{
      if(err){
          throw err;
      }else{
          res.json({ message: "Delete success!" });
      }
  });
})

//Product
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));
app.listen(PORT);
