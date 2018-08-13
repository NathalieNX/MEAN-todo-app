// service layer : gets the Mongoose model

var ToDo = require('../models/todo.model');

_this = this;

// async function to get the todo list

exports.getTodos = async function(query, page, limit){
    // setup options for the mongoose paginate

    var options = {
        page,
        limit
    }

    // try catch the awaited promise to handle the error :
    // return the todo list returned by the mongoose promise

    try {
        var todos = await ToDo.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Service - Error while paginating todos');
    }

}

exports.createTodo = async function(todo){

    // try to create a new Mongoose object using the keyword

    var newTodo = new ToDo({
        title : todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    })

    // try saving the todo list
    try{
        var savedTodo = await newTodo.save();
        return savedTodo;
    } catch (e) {
        throw Error("Service - Error while creating todo");
    }
}

exports.updateTodo = async function(todo){
    var id = todo.id
    
    // try finding the todo list using id
    try{
        var oldTodo = await ToDo.findById(id);
    } catch (e) {
        throw Error("Service - Error while finding todo using id");
    }

    // if no oldTodo object exists, return false, else console.log
    if(!oldTodo){
        return false; 
    };
    console.log("old todo list : ", oldTodo);

    // edit the todo
    oldTodo.title = todo.title;
    oldTodo.description = todo.description;
    oldTodo.status = todo.status;

    console.log("new todo list : ", oldTodo);

    // try saving the todo list
    try{
        var savedTodo = await oldTodo.save();
        return savedTodo;
    } catch (e) {
        throw Error("Service - Error while updating todo");
    }

}

exports.deleteTodo = async function(id){
    
    // try deleting the todo
    try{
        var deleted = await ToDo.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Service - Todo Could not be deleted")
        }
        return deleted
    } catch(e) {
        throw Error("Service - Error Occured while Deleting the Todo")
    }
}