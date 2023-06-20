"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import routers from './app/routes';
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// // Application routes
app.use('/api/v1', routes_1.default);
// // global errors handler
app.use(globalErrorHandler_1.default);
//handle notFound Route error
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: true,
        message: '',
        errorMessages: [
            {
                path: '',
                message: 'API not Found',
            },
        ],
    });
    next();
});
exports.default = app;
