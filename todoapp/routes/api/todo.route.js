// api layer : mapping layer
// specific api endpoints will be mapped to controller funtions

var express = require('express');
var router = express.Router();

var ToDoController = require('../../controllers/todo.controller');

// mapp each API to the controller functions

router.get('/', ToDoController.getTodos);
router.post('/', ToDoController.createTodo);
router.put('/', ToDoController.updateTodo);
router.delete('/:id', ToDoController.removeTodo);

module.exports = router;