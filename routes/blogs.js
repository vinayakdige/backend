const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { connection } = require("../connection");
const verify = require("../middleware/verify");

//get all blog
router.get("/all", verify, async (req, res) => {
    const { db } = await connection();
  
    const courseExists = await db.collection("blogs").find({}).toArray();
  
    if (!courseExists.length) {
      return res.json({ message: "No blogs found", isSuccess: false });
    }
  
    return res.json({ message: "blogs found", courseExists, isSuccess: true });
  });


  //addblog

  router.post("/addblog",verify, async (req, res) => {
    const { db } = await connection();
  
    const { title, auther, description } = req.body;
  
    if (!title || !auther || !description) {
      return res.json({
        message: "Please fill all the details",
        isSuccess: false,
      });
    }
  
    const courseExists = await db.collection("blogs").findOne({ title });
  
    if (courseExists) {
      return res.json({ message: "blog already exists", isSuccess: false });
    }
  
    await db
      .collection("blogs")
      .insertOne({ title, auther, description });
  
    return res.json({ message: "blog Added Successfully", isSuccess: true });
  });

  //edit/update blog


  router.put("/editblog/:id", verify, async (req, res) => {
    const { db } = await connection();
   
    const { title, auther, description } = req.body;
    const id = req.params.id;
  
    if (!title || !auther || !description) {
      return res.json({
        message: "Please fill all the details",
        isSuccess: false,
      });
    }
  
    const blogExists = await db
      .collection("blogs")
      .findOne({ _id: ObjectId(id) });
  
    if (!blogExists) {
      return res.json({ message: "blog not found", isSuccess: false });
    }
  
    await db
      .collection("blogs")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { title, auther, description } }
      );
  
    return res.json({ message: "blog updated Successfully", isSuccess: true });
  });

  router.delete("/deleteCourse/:id", verify, async (req, res) => {
    const { db } = await connection();
    const id = req.params.id;
  
    const courseExists = await db
      .collection("blogs")
      .findOne({ _id: ObjectId(id) });
  
    if (!courseExists) {
      return res.json({ message: "blog not found", isSuccess: false });
    }
  
    await db.collection("blogs").deleteOne({ _id: ObjectId(id) });
  
    return res.json({ message: "blogs deleted", isSuccess: true });
  });
 
  
  module.exports = router;