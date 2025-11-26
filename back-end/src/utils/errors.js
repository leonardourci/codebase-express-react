"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidationError = exports.CustomError = void 0;
const statusCodes_1 = require("../domain/statusCodes");
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
class JoiValidationError extends CustomError {
    constructor(error) {
        super(error.message, statusCodes_1.EStatusCodes.UNPROCESSABLE);
        this.messages = error.details.map((detail) => detail.message);
    }
}
exports.JoiValidationError = JoiValidationError;
