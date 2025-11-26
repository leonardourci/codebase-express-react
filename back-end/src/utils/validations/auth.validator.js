"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignupPayload = exports.validateLoginPayload = void 0;
const joi_1 = __importDefault(require("joi"));
const validateLoginPayload = (payload) => joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
}).validate(payload, { abortEarly: false });
exports.validateLoginPayload = validateLoginPayload;
const validateSignupPayload = (payload) => joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    age: joi_1.default.number().integer().positive().required(),
}).validate(payload, { abortEarly: false });
exports.validateSignupPayload = validateSignupPayload;
