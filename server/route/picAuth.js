const router = require("express").Router();
const Picture = require("../models").Picture;
const Comment = require("../models").Comment;
const multer = require("multer");
const { User } = require("../models");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
const picValid = require("../valid").picValid;
const comValid = require("../valid").comValid;

router.use((req, res, next) => {
  console.log("picture auth request");
  next();
});

router.post("/", upload.single("img"), async (req, res) => {
  let { error } = picValid(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let isImg = fileFilter(req.file);
  if (!isImg) return res.status(400).send("wrong file type");
  let { title, description, tag } = req.body;
  let newImg = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
  let newPic = new Picture({
    id: req.user._id,
    picture: newImg,
    author: req.user._id,
    title: title,
    description: description,
    tag: tag,
  });
  try {
    let save = await newPic.save();
    return res.send("picture post successfully");
  } catch (e) {
    return res.status(500).send(e);
  }
}); //post picture

router.post("/:_id", async (req, res) => {
  let { error } = comValid(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  let { comment } = req.body;
  let newComment = new Comment({
    author: req.user._id,
    comment: comment,
    post: _id,
  });
  try {
    let save = await newComment.save();
    let foundPic = await Picture.findOne({ _id: _id }).exec();
    foundPic.comment.push(save._id);
    let result = await foundPic.save();
    return res.send("comment post successfully");
  } catch (e) {
    return res.status(500).send(e);
  }
}); //post comment
router.post("/:picId/like", async (req, res) => {
  console.log("like");
  try {
    let { picId } = req.params;
    let foundPic = await Picture.findOne({ _id: picId }).exec();
    foundPic.like.push(req.user._id);
    let foundUser = await User.findOne({ _id: req.user._id }).exec();
    foundUser.like.push(picId);
    await foundPic.save();
    await foundUser.save();
    return res.send({ msg: "like" });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});
router.delete("/:picId/like", async (req, res) => {
  console.log("dislike");
  try {
    let { picId } = req.params;
    let foundPic = await Picture.findOne({ _id: picId }).exec();
    let foundUser = await User.findOne({ _id: req.user._id }).exec();
    let picResult = foundPic.like.forEach((userID, index) => {
      userID == req.user._id ? foundPic.like.splice(index, 1) : null;
    });
    let userResult = foundUser.like.forEach((likedPicId, index) => {
      picId == likedPicId ? foundUser.like.splice(index, 1) : null;
    });

    await foundPic.save();
    await foundUser.save();
    return res.send({ msg: "saved successfully" });
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.patch("/:_id", async (req, res) => {
  console.log(req.body);
  let { error } = picValid(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  let { title, description, tag } = req.body;
  try {
    let findPic = await Picture.findOne({ _id });
    if (!findPic) {
      return res.status(400).send("you didn't posted this picture");
    }
    let update = await Picture.findOneAndUpdate(
      { _id },
      { title: title, description: description },
      {
        new: true,
      }
    );
    return res.send({ msg: "update successfully", update: update });
  } catch (e) {
    return res.status(500).send(e);
  }
}); //update picture

router.patch("/comment/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let findCom = await Comment.findOne({ _id });
    if (!findCom) {
      return res.status(400).send("you didn't posted this comment");
    }
    let update = await Comment.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    return res.send({ msg: "update successfully", update: update });
  } catch (e) {
    return res.status(500).send(e);
  }
}); //update comment

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let findPic = await Picture.findOne({ _id });
    if (!findPic) {
      return res.status(400).send("you didn't posted this picture");
    }
    let del = await Picture.findOneAndDelete({ _id });
    return res.send({ msg: "update successfully", delete: del });
  } catch (e) {
    return res.status(500).send(e);
  }
}); //delect picture

router.delete("/comment/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let findCom = await Comment.findOne({ _id });
    if (!findCom) {
      return res.status(400).send("you didn't posted this comment");
    }
    let del = await Comment.findOneAndDelete({ _id });

    return res.send({ msg: "update successfully", delete: del });
  } catch (e) {
    return res.status(500).send(e);
  }
}); //delect comment

function fileFilter(file) {
  const allowFileTypes = ["image/png", "image/jpeg", "image/gif"];
  let result = allowFileTypes.includes(file.mimetype);

  return result;
}

module.exports = router;
