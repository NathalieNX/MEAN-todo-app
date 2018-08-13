// controller layer : control the request body parsing, validating,
// checking, responding and Error returning actions.

// access the service layer

var TodoService = require('../services/todo.service');

_this = this;

// async controller function to get the todo list

exports.getTodos = async function(req, res, next){
    // Check the existence of the query parameters
    // if do not exist assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    // try return the todos list with the appropriate HTTP Status Code and Message.
    try{
        var todos = await TodoService.getTodos({}, page, limit)
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
    } catch(e) {
        // return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTodo = async function(req, res, next){
    var todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }

    // try to create a new todo by calling the service async function
    try{
        var createdTodo = await TodoService.createTodo(todo);
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

exports.updateTodo = async function(req, res, next){
    // check that id is present
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    console.log(req.body);

    var todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    // try to update todo by calling the service async function
    try{
        var updatedTodo = await TodoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
    } catch(e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTodo = async function(req, res, next){
    var id = req.params.id;

    // try to delete todo by calling the service async function
    try{
        var deleted = await TodoService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}