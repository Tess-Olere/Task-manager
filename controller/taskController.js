const Tasks = require('../model/tasks');
// 'Tasks' here is a variable name that stores the items in the model folder 
const asyncWrapper = require('../middleware/async')


//get all the task
// const getAllTasks =  async (req, res) => {
//     try {
//         const tasks = await Tasks.find()
//             res.status(200).json({ numOfTasks: tasks.length, tasks })
//     } catch (error) {
//         res.status(500).json({ msg: 'An error occured' })
//     }
// }
const getAllTasks = asyncWrapper ( async (req, res) => {
        const tasks = await Tasks.find()
         res.status(200).json({ numOfTasks: tasks.length, tasks })  
})

//get a single task - req.params - taskId
// const getTask = async (req, res) => {
//     const { taskId } = req.params;
//     try {
//         const task = await Tasks.findOne({ _id: taskId })
//         if(!task){
//             return res.status(404).json({ msg: `Task with the id: ${taskId} not found` })
//         }
//         res.status(200).json({task})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ msg: 'An error occured' })
//     }
// }
const getTask = asyncWrapper(async (req, res) => {
    const { taskId } = req.params;
        const task = await Tasks.findOne({ _id: taskId })
        if(!task){
            return res.status(404).json({ msg: `Task with the id: ${taskId} not found` })
        }
        res.status(200).json({task})
    
})


//create task - req.body- title, priority, completed
// const createTask = async (req, res) => {
//     try {
//         const { title, priority } = req.body
//         if (!title || !priority) {
//            return res.status(400).json({ msg: 'Please provide necessary information'})
//         }
//         const task = await Tasks.create(req.body)
//         res.status(200).json({ msg: 'Task created successfully', task })
//     } catch (error) {
//         res.status(500).json({ msg: 'An error occured' }) 
//     }
// }
const createTask = asyncWrapper( async (req, res) => {
        const { title, priority } = req.body
        if (!title || !priority) {
           return res.status(400).json({ msg: 'Please provide necessary information'})
        }
        const task = await Tasks.create(req.body)
        res.status(200).json({ msg: 'Task created successfully', task })
   
})
//update
// const updateTask = async (req, res) => {
//     try {
//     const {taskId} = req.params
//     const task = await Tasks.findByIdAndUpdate({_id: taskId}, req.body, {
//         new: true,
//         runValidators: true,
//     })
//         if(!task){
//             return res.status(404).json({ msg: `Task with the id: ${taskId} not found` })
//         }   
//         res.status(200).json({ msg: 'Task updated successfully', task })
//     } catch (error) {
//         res.status(500).json({ msg: 'An error occured' }) 
//     }
// }
const updateTask = asyncWrapper( async (req, res) => {  
    const {taskId} = req.params
    const task = await Tasks.findByIdAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true,
    })
        if(!task){
            return res.status(404).json({ msg: `Task with the id: ${taskId} not found` })
        }   
        res.status(200).json({ msg: 'Task updated successfully', task })
})
    

//delete
const deleteTask = async (req, res) => {
    const {taskId} = req.params
    try {
        const task = await Tasks.findByIdAndDelete({ _id: taskId })
        if(!task){
            return res.status(404).json({ msg: `Task with the id: ${taskId} not found` })
        }
        res.status(200).json({ msg: 'Task deleted successfully', task})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occured' })
    }
}
//exports
module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}