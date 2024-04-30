const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Task = require("../models/Task");
const fetchUser = require("../middleware/fetchUser");
const authAdmin = require("../middleware/authAdmin");
const User = require("../models/User");

router.post(
  "/createTask/:id",
  [
    body("title").isLength({ min: 5 }).withMessage("Title can not be empty"),
    body("description").isLength({ min: 5 }).withMessage("Description can not be empty"),
  ],
  authAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body.title);
    console.log(req.body.description);
    if (!errors.isEmpty()) {
      console.log("error is coming from this side");
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.params.id, "/////////////i am id");

    try {
      const task = await Task.create({
        user: req.params.id,
        title: req.body.title,
        description: req.body.description,
      });

      res.send(task);
    } catch (error) {
      console.log("error is coming from this side2");
      console.error(error.message);
      res.status(500).send("Internal Server Occured");
    }
  }
);

//endpoint to update a particular task
router.put(
  "/updateTask/:id",
  [
    body("title")
      .isLength({ min: 5 })
      
      .withMessage("Title can not be empty."),
    body("description")
      .isLength({ min: 5 })
       
      .withMessage("Description can not be empty."),
  ],
  authAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error is coming from this side");
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title, description: req.body.description },
        { new: true }
      );
      res.send(task);
    } catch (error) {
      console.log("error is coming from this side2");
      console.error(error.message);
      res.status(500).send("Internal Server Occured");
    }
  }
);

//endpoint to get a particular task by id
router.get("/getTask/:id", authAdmin, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log(task);
    if(task){
      res.send(task)
    }
    else{
      res.status(404).json({error:"Not found"})
    }
    
  } catch (error) {
    console.log(error.message);
  }
});

//endpoint to get tasks of a specific user
router.get("/getUserTasks/:id", authAdmin, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.id });

    res.send(tasks);
  } catch (error) {
    console.log("error is coming from this side2");
    console.error(error.message);
    res.status(500).send("Internal Server Occured");
  }
});

router.delete("/deleteTask/:id", authAdmin, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "note deleted successfully." });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
