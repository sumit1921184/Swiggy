const jwt = require("jsonwebtoken");
const { User } = require("../Model/user.model");
const { Post } = require("../Model/post.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decode.id);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "authentication failed" });
  }
};

const Owner = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ msg: "An error occurred" });
  }
};

module.exports = {
  auth,
  Owner,
};