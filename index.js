const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const {
  createProduct,
  fetchProductsByFilter,
  fetchProductById,
  updateProduct,
} = require("./controller/Product");
const { createBrand, fetchBrands } = require("./controller/Brand");
const { createCategory, fetchCategories } = require("./controller/Category");
const { fetchUserById, updateUser } = require("./controller/User");
const { createUser, loginUser } = require("./controller/Auth");
const {
  addToCart,
  fetchCartByUser,
  deleteCartItem,
  updateCartItem,
} = require("./controller/Cart");
const {
  createOrder,
  fetchOrders,
  deleteOrder,
  updateOrder,
  fetchUserOrders,
} = require("./controller/Order");
const session = require("express-session");
const passport = require("passport");
// when i connecting to react i have to change port and set 8080

// middlewares
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored
//     store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
//   })
// );
// app.use(passport.authenticate("session"));
app.use(express.json()); // to parse req.body
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
); // to parse req.body

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://bundheliyadeep:Deep1234@cluster0.hpg57sk.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("database connected");
};
main().catch((err) => console.log(err));

app.get("/", (req, resp) => {
  resp.send("hyy nbvnhv");
});

app.post("/products", createProduct);
app.get("/products", fetchProductsByFilter);
app.get("/products/:id", fetchProductById);
app.patch("/products/:id", updateProduct);

app.post("/brands", createBrand);
app.get("/brands", fetchBrands);

app.post("/categories", createCategory);
app.get("/categories", fetchCategories);

app.post("/auth/signup", createUser);
app.post("/auth/login", loginUser);
app.patch("/users/:id", updateUser);
app.get("/users/:id", fetchUserById);

app.post("/cart", addToCart);
app.get("/cart", fetchCartByUser);
app.delete("/cart/:id", deleteCartItem);
app.patch("/cart/:id", updateCartItem);

app.post("/orders", createOrder);
app.get("/ordersOfUser", fetchUserOrders);
app.get("/orders", fetchOrders);
app.delete("/orders/:id", deleteOrder);
app.patch("/orders/:id", updateOrder);

app.listen(8080, () => {
  console.log("Sever started at port 8080");
});

// passport strategies
// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );
