const taskModel = require('../TaskModel/taskModel');

class taskController{

    async createTask(req,res){
        try{
            console.log("The Task details Collected from the Postman: ",req.body);
            if(!req.body.title){
                return res.status(401).json({
                    Success:false,
                    Message:'You must need to put One task Title'
                })
            }else if(!req.body.priority){
                return res.status(401).json({
                    Success:false,
                    Message:'You must need to mention your task Priority'
                })
            }else{
                
                let newTask = new taskModel({
                    title:req.body.title,
                    description:req.body.description,
                    status:req.body.status,
                    priority:req.body.priority,
                    dueDate: new Date(req.body.dueDate),
                });

                let saveTask = await newTask.save();
                if(saveTask){
                    return res.status(200).json({
                        Success:true,
                        Message:'Your Task is inserted into the database Successfully',
                        Result:saveTask
                    })
                }
            }
        
        }catch(error){
            console.log("Error in creating New Task: "+error);
            return res.status(401).json({
                Success:false,
                Message:'Failed to craete New task '+error
            })
            
        }
    }

    

    async allTasks_With_Sorting(req,res){
        try {
            const { status, priority, sort, limit, skip } = req.query;
        
            // Build filter object
            let filter = {};
            if (status) filter.status = status;
            if (priority) filter.priority = priority;
        
            // Build sort options
            let sortOptions = {};
            if (sort) {
              const [field, order] = sort.split(":"); // Example: sort=createdAt:desc
              sortOptions[field] = order === "desc" ? -1 : 1;
            }
        
            // Pagination
            const pageLimit = parseInt(limit) || 10; // Default limit is 10
            const pageSkip = parseInt(skip) || 0; // Default skip is 0
        
            // Fetch tasks
            const tasks = await taskModel.find(filter)
              .sort(sortOptions)
              .limit(pageLimit)
              .skip(pageSkip);
        
            // Get total task count for pagination metadata
            const totalTasks = await taskModel.countDocuments(filter);
        
           return res.status(200).json({
              tasks,
              totalTasks,
              pageInfo: {
                limit: pageLimit,
                skip: pageSkip,
              },
            });
          } catch (error) {
            return res.status(500).json({
                Success:false,
                error: error.message });
          }
    }

    async specificTaskById(req,res){
        try{
            console.log("The task id Collected From Postman Url: ",req.params.id);
            let taskDetails = await taskModel.findOne({_id:req.params.id});
            if(taskDetails){
                return res.status(200).json({
                    Success:true,
                    Message:'Your task details are Successfully Fetched from database',
                    task_Details: taskDetails
                })
            }
            
        }catch(error){
            console.log("Failed to fetch Specific Task details from the Database: ",error);
            return res.status(404).json({
                Success:false,
                Message:'Your Task Not Found!'
            });
        }
    }

    async editTask(req,res){
        try{
            console.log("The Task id collected for Edit Task: ",req.params.id);
            let exitstingTask_details = await taskModel.findOne({_id:req.params.id});
            console.log("The Existing task details: ",exitstingTask_details);

            console.log("The Updated Task details Collected from Postman: ",req.body);
            
            /* ------------ Updating Task Details ---------------- */
            exitstingTask_details.title = req.body.title || exitstingTask_details.title;
            exitstingTask_details.description = req.body.description || exitstingTask_details.description;
            exitstingTask_details.status = req.body.status || exitstingTask_details.status;
            exitstingTask_details.priority = req.body.priority || exitstingTask_details.priority;
            exitstingTask_details.dueDate = req.body.dueDate || exitstingTask_details.dueDate;
            
            await exitstingTask_details.save();
        
                console.log("The Task details are Updated Successfully");
                return res.status(200).json({
                    Success:true,
                    Mesasage:'The task details are Updated Successfully',
                    Updated_Task:exitstingTask_details
                })
                
            
            
        }catch(error){
            console.log("Failed to edit Task details: ",error);
            return res.status(401).json({
                Success:false,
                Message:'Failed to Update Task Details: '+error
            })
            
        }
    }

    async deleteTask(req,res){
        try{
            console.log('The taks id collected from postMan: ',req.params.id);
             await taskModel.deleteOne({_id:req.params.id});
            console.log("The task has been deleted Successfully");
            
                return res.status(204).json({
                    Success:true,
                    Message:'No Content on successful deletion'
                })
            
        }catch(error){
            console.log("Failed to delete Task from the Database: ",error );
            return res.status(401).json({
                Success:false,
                Message:'Failed to delete task from the Database: '+error
            })
            
        }
    }
}


module.exports = new taskController();
