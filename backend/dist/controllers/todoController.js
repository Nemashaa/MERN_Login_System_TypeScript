"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const axios_1 = __importDefault(require("axios"));
// Get Todos for Authenticated User and JSONPlaceholder Todos
exports.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const todosFromDb = yield todo_1.default.find({ userId });
    // Fetch sample todos from JSONPlaceholder
    const { data: jsonTodos } = yield axios_1.default.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    // Combine both data sources
    const allTodos = [...todosFromDb, ...jsonTodos];
    res.json(allTodos);
}));
// Create a New Todo
exports.createTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const { title } = req.body;
    const todo = yield todo_1.default.create({ userId, title, completed: false });
    res.status(201).json(todo);
}));
// Update a Todo
exports.updateTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = yield todo_1.default.findOneAndUpdate({ todoId: id, userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }, { title, completed }, { new: true });
    res.json(updatedTodo);
}));
// Delete a Todo
exports.deleteTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id } = req.params;
    yield todo_1.default.findOneAndDelete({ todoId: id, userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id });
    res.json({ message: 'Todo deleted' });
}));
