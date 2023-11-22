const express = require("express");
const loggedIn = require("../controllers/loggedIn")
const router = express.Router();
const app = express();
const db = require("./db-config");

let commonStatus;

router.get('/', loggedIn, (req, res) => {
    if (req.user) {
        commonStatus = "loggedIn";
    } else {
        commonStatus = "no";
    }
    res.render("index", { user: req.user, status: commonStatus });
});

// router.get('/all_pet', (req, res) => {
//     res.render("all_pet", { status: commonStatus });
// });
router.get('/all_pet', (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) throw err;
        const data = result;
        res.render("all_pet", { status: commonStatus, data: data });
    });
});


router.get('/page_cart', (req, res) => {
    res.render("page_cart", { status: commonStatus });
});

router.get('/pay', (req, res) => {
    res.render("pay", { status: commonStatus });
});
router.get('/profile', (req, res) => {
    res.render("profile");
});

//Dua ra bang san pham
router.get("/add", (req, res, next) => {
    db.query("SELECT * FROM product", (err, result) =>{
        if(err) throw err;
        const data = result
        res.render("add", {data: data})
    })
})

//Them moi san pham
router.get('/add_page', (req, res) => {
    res.render("add_page");
});
  
router.post("/add_page", (req, res) => {
    const { type, name, img, price } = req.body;
    const query = `INSERT INTO product(type, name, img, price) VALUES ('${type}', '${name}', '${img}', ${price})`;
    
    db.query(query, (err) => {
      if (err) throw err;
      res.redirect("/add");
    });
});  

//Xoá sản phẩm
router.get("/delete/:id", (req, res) =>{
    const query = `DELETE FROM product WHERE id=${req.params.id}`
    db.query(query, (err) => {
        if (err) throw err;
        res.redirect("/add");
    })
})
//Sửa sản phẩm
router.get('/edit_page', (req, res) => {
    res.render("edit_page");
});

router.get("/edit_page/:id", (req, res) => {
    const query = `SELECT * FROM product WHERE id=${req.params.id}`
    let data = db.query(query, (err, result)=>{
        if(err) throw err
        data = {
            id: result[0].id,
            type: result[0].type,
            name: result[0].name,
            img: result[0].img,
            price: result[0].price
        }
        res.render("edit_page", {data})
    })
})

router.post("/edit_page", (req, res) => {
    const { type, name, img, price, id } = req.body;
    const query = `UPDATE product SET type = ?, name = ?, img = ?, price = ? WHERE id = ?`;
    db.query(query, [type, name, img, price, id], (err) =>{
        if(err) throw err;
        res.redirect("/add");
    });
});


router.get('/register', (req, res) =>{
    res.sendFile("register.html", {root: "./public"});
})
router.get('/login', (req, res) =>{
    res.sendFile("login.html", {root: "./public"});
})

module.exports = router;