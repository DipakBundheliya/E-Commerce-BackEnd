const { User } = require("../model/User");

exports.createUser = async (req, resp) => {
  const user = new User(req.body);
  try {
    const userData = await user.save();
    resp.status(200).json(userData);
  } catch (err) {
    resp.status(400).json(err);
  }
};

exports.loginUser = async (req, resp) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.password === req.body.password) {
        resp
          .status(200)
          .json({ id: user.id, email: user.email, name: user.name });
      } else {
        resp.status(401).json({ message: "wrong credentials" });
      }
    } else {
      resp.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    resp.status(400).json(err);
  }
};
