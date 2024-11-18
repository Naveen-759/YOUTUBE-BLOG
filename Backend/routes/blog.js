const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const runChat = require("../config/gemini");
// import runChat from "../config/gemini";

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", async (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  // console.log(comments);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.get("/delete/:id", async (req, res) => {
  // if (req.method === "DELETE") {
  // Your delete logic here
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  // console.log(body);

  const response = await runChat(body);
  let responseArray = response.split("**");
  // console.log(responseArray);

  let newResponse = "";
  for (let i = 0; i < responseArray.length; i++) {
    if (i === 0 || i % 2 !== 1) {
      newResponse += responseArray[i];
    } else {
      newResponse += "</br>" + "<b>" + responseArray[i] + "</b>";
    }
  }

  let newResponse2 = newResponse.split("*").join(" ");
  // let newResponseArray = newResponse2.split(" ");

  console.log(newResponse2);

  const blog = await Blog.create({
    body: newResponse2,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
