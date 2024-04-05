const router = require("express").Router();
const Picture = require("../models").Picture;
const Comment = require("../models").Comment;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 7000000 } });
const picAuthRouter = require("./picAuth");
const passport = require("passport");
const limit = 12;
require("../config/passport")(passport);

router.use((req, res, next) => {
  console.log("picture request");
  next();
});

router.use(
  "/postPic",
  passport.authenticate("jwt", { session: false }),
  picAuthRouter
);

router.get("/", async (req, res) => {
  let { page } = req.query;
  try {
    let allPic = await Picture.find({})
      .populate("author", ["username", "profile"])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    return res.send(allPic);
  } catch (e) {
    return res.status(500).send(e);
  }
}); //get all picture

router.get("/search/:keywords", async (req, res) => {
  let { keywords } = req.params;
  let { page } = req.query;
  try {
    let result = await Picture.find({ $text: { $search: keywords } })
      .populate("author", ["username", "profile"])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return res.send(result);
  } catch (e) {
    return res.status(500).send(e);
  }
}); //search by keyword

router.get("/tag/:tags", async (req, res) => {}); //search by tag

router.get("/user/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { page } = req.query;
    let result = await Picture.find({ id: _id })
      .populate("author", ["username", "profile"])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return res.send(result);
  } catch (e) {
    return res.status(500).send(e);
  }
}); //get by user id

router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  let { page } = req.query;
  try {
    let foundPic = await Picture.findOne({ _id: _id })
      .populate("author", ["username", "profile", "subscriber"])
      .exec();
    let foundComments = await Comment.find({ post: _id })
      .populate("author", ["username", "profile"])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    return res.send({ pic: foundPic, com: foundComments });
  } catch (e) {
    return res.status(500).send(e);
  }
}); //get by picture id

module.exports = router;
