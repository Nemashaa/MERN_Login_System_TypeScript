"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const corsConfig_1 = __importDefault(require("./config/corsConfig"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const logger_1 = __importDefault(require("./utils/logger"));
const morganLogger_1 = __importDefault(require("./utils/morganLogger"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Use morganLogger middleware to log HTTP requests
app.use(morganLogger_1.default); // This will log all HTTP requests
// Database connection
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => logger_1.default.info('Database Connected'))
    .catch((err) => logger_1.default.error(`Database Connection Failed: ${err.message}`));
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsConfig_1.default)); // Use the updated CORS configuration
// Routes
app.use('/', authRoutes_1.default);
app.use('/api', postRoutes_1.default); // Add post routes
// Global Error Handler Middleware
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 8001; // Backend is running on port 8001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
