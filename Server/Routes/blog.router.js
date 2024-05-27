const express = require("express");
const router = express.Router();
const blogsController = require("../Controllers/blog.controller.js");

router.get("/", blogsController.getPosts);
router.post("/", blogsController.addPosts);
router.put("/:id", blogsController.EditPosts);
router.delete("/:id", blogsController.deletePost);

module.exports = router;
