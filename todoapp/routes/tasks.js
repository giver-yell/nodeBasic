const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getsingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks")

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getsingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
