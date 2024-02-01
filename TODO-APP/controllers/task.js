import taskModel, {Status} from "../models/task.js";
import subTaskModel from "../models/subtask.js";
import dotenv from "dotenv";
import cronScheduler from "../utilites/cronScheduler.js"
dotenv.config();


export const addTask = async (req, res) => {
        try {
            const { title, description, due_date } = req.body;
            const userId = req.user.id;
    
            const newTask = new taskModel({ title, description, userId, due_date });
            await newTask.save();
    
            cronScheduler.createTaskScheduler();
    
            res.status(200).json({ message: "Task added successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

export const getAllTask = async (req, res) => {
        try {
            const { priority, dueDate } = req.query;
            const filters = {};
    
            if (priority) {
                filters.priority = parseInt(priority);
            }
    
            if (dueDate) {
                filters.due_date = { $lte: new Date(dueDate) };
            }
    
            let tasks;
    
            if (Object.keys(req.query).length === 0) {
                tasks = await taskModel.find();
            } else {
                tasks = await taskModel.find(filters);
    
                if (tasks.length === 0) {
                    return res.status(404).json({ message: "No tasks found with the given filters" });
                }
            }
    
            res.status(200).json(tasks);
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
};

export const updateTask = async (req, res) => {
    try {
        const { id, due_date, status } = req.body;

        let todoStatus;

        if (status == Status.DONE) todoStatus = Status.DONE;
        else if (status == Status.IN_PROGRESS) todoStatus = Status.IN_PROGRESS;
        else todoStatus = Status.TODO;

        const updateVal = {
            status: todoStatus,
            due_date: due_date
        };

        await taskModel.findByIdAndUpdate({ _id: id }, updateVal);
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};

export const updateTaskPriority = async (priority, id, res) => {
    try {
        await taskModel.findByIdAndUpdate({ _id: id }, { priority });
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};


export const removeTask = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;  
        const task = await taskModel.findOne({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        await taskModel.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};

export const addSubtask = async (req, res) => {
    try {
            const { task_id, content } = req.body;
            const newTask = new subTaskModel({ task_id, content, status: false });
            await newTask.save();
            res.status(200).json({ message: "Sub Task added successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};
    

export const updateSubTask = async (req, res) => {
        const {status, id} = req.body;
        try {
            const subtask = await subTaskModel.findByIdAndUpdate({_id: id}, {status: status});
            res.send("Updated Successfully")
        } catch (error) {
            res.status(500).json({message: error.message});
        }
};

export const getAllSubtask = async (req, res) => {
        try {
            const { taskId } = req.query;
    
            const filters = taskId ? { task_id: parseInt(taskId) } : {};
    
            const subtasks = await subTaskModel.find(filters);
    
            if (subtasks.length === 0) {
                return res.status(404).json({ message: "No subtasks found with the given filters" });
            }
    
            res.status(200).json(subtasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

export const removeSubTask = async (req, res) => {
        try {
            const { id } = req.body;
            await subTaskModel.findByIdAndDelete({ _id: id });
            res.status(200).json({ message: "Subtask deleted successfully" });
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
};


