import express from "express"
import {addTask, getAllTask, addSubtask, getAllSubtask, updateTask, updateSubTask, removeTask, removeSubTask} from "../controllers/task.js"
import requireAuth from "../middleware/Auth.js";

const router = express.Router();

router.post("/addtask", requireAuth, addTask)
router.get("/alltasks", requireAuth, getAllTask)


router.post("/sub_task", requireAuth, addSubtask)
router.get("/allsubtasks", requireAuth, getAllSubtask)

router.post("/update_subtask", requireAuth, updateSubTask)
router.post("/update_task", requireAuth,  updateTask)


router.delete("/deltask", requireAuth, removeTask)
router.delete("/del_subtask", requireAuth, removeSubTask)


export default router;