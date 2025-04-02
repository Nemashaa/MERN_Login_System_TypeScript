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
exports.checkTodoOwnership = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const checkTodoOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const todo = yield todo_1.default.findById(id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        if (todo.user.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            res.status(403).json({ message: 'You are not authorized to modify this todo' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.checkTodoOwnership = checkTodoOwnership;
