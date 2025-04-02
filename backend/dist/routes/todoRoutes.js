"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const todoMiddleware_1 = require("../middlewares/todoMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.default, todoController_1.getTodos);
router.post('/', authMiddleware_1.default, todoController_1.createTodo);
router.put('/:id', authMiddleware_1.default, todoMiddleware_1.checkTodoOwnership, todoController_1.updateTodo);
router.delete('/:id', authMiddleware_1.default, todoMiddleware_1.checkTodoOwnership, todoController_1.deleteTodo);
exports.default = router;
