const express = require('express');
const route = express.Router();
const taskController = require('../Module/Webservices/TaskController');


route.post('/addTask',taskController.createTask);
route.get('/allTask',taskController.allTasks_With_Sorting);
route.get('/SpecificTask/:id',taskController.specificTaskById);
route.put('/editTask/:id',taskController.editTask);
route.delete('/deleteTask/:id',taskController.deleteTask);


module.exports = route;