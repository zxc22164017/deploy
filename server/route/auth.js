const router = require("express").Router();
const User = require("../models").User;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 625000 },
});
const registerValid = require("../valid").registerValid;
const loginValid = require("../valid").loginValid;
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);

router.use((req, res, next) => {
  console.log("auth request");
  next();
});

router.get("/:_id", async (req, res) => {
  let { _id } = req.params;

  try {
    let foundUser = await User.findOne({ _id }).exec();
    if (!foundUser) return res.status(400).send("User not Exist");

    return res.send(foundUser);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/register", async (req, res) => {
  let { error } = registerValid(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { username, password, email, gender } = req.body;
  let isExist = await User.findOne({ email: email }).exec();
  if (isExist) {
    return res.status(400).send("registered");
  } else {
    let newUser = new User({
      username: username,
      password: password,
      email: email,
      gender: gender,
    });
    try {
      let save = await newUser.save();
      return res.send(save);
    } catch (e) {
      return res.status(500).send(e);
    }
  }
});
router.post("/profile/:_id", upload.single("img"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("no file select");
    let isImg = fileFilter(req.file);
    if (!isImg) return res.status(400).send("wrong file type");
    let { _id } = req.params;
    let newImg = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    let foundUser = await User.findOne({ _id }).exec();
    foundUser.profile = newImg;
    let result = await foundUser.save();
    return res.send(result);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValid(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { password, email } = req.body;
  let foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) {
    return res
      .status(401)
      .send({ msg: "email is incorrected", foundUser: foundUser });
  }
  foundUser.compare(password, (e, isMatch) => {
    if (e) return res.status(500).send(e);
    if (isMatch) {
      const tokenObj = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObj, process.env.SECRET_KEY);

      return res.send({
        msg: "login success",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res
        .status(400)
        .send({ msg: "incorrect email or password", foundUser });
    }
  });
});
router.post("/follow/:_id", async (req, res) => {
  console.log("follow");
  try {
    let { _id } = req.params;
    let { userId } = req.body;
    let beFollowed = await User.findOne({ _id });
    let following = await User.findOne({ _id: userId });
    beFollowed.follower.push(userId);

    following.subscriber.push(beFollowed);
    let followedResult = await beFollowed.save();
    let followingResult = await following.save();
    return res.send({ followingResult, followedResult });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
}); //follow
router.post("/unfollow/:_id", async (req, res) => {
  console.log("unfollow");
  try {
    let { _id } = req.params;
    let { userId } = req.body;
    let beFollowed = await User.findOne({ _id: _id });
    let following = await User.findOne({ _id: userId });

    beFollowed.follower.forEach((followerID, index) => {
      followerID === userId ? beFollowed.follower.splice(index, 1) : null;
    });
    following.subscriber.forEach((susID, index) => {
      susID === _id ? following.subscriber.splice(index, 1) : null;
    });

    let beResult = await beFollowed.save();
    let ingResult = await following.save();
    return res.send({ beResult, ingResult });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
}); //unfollow

router.patch(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { _id } = req.params;

    let { username, email, password, gender } = req.body;
    try {
      let findUser = await User.findOne({ _id });
      if (!findUser) {
        return res.status(400).send("user doesn't exist");
      }
      if (username) {
        findUser.username = username;
      }
      if (email) {
        findUser.email = email;
      }
      if (password) {
        findUser.password = password;
      }
      if (gender) {
        findUser.gender = gender;
      }
      let update = await findUser.save();

      return res.send({ msg: "update successfully", update: update });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
); //update user

function fileFilter(file) {
  const allowFileTypes = ["image/png", "image/jpeg", "image/gif"];
  let result = allowFileTypes.includes(file.mimetype);

  return result;
}

module.exports = router;
