"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("./errors");
const statusCodes_1 = require("../domain/statusCodes");
const { JWT_SECRET } = process.env;
const generateToken = (payload) => jsonwebtoken_1.default.sign(payload, JWT_SECRET !== null && JWT_SECRET !== void 0 ? JWT_SECRET : '', { expiresIn: '1d' });
exports.generateToken = generateToken;
// @TODO remove the any from the response of this method
const verifyToken = (payload) => {
    if (!(payload === null || payload === void 0 ? void 0 : payload.authorization))
        throw new errors_1.CustomError('TOKEN_NOT_FOUND', statusCodes_1.EStatusCodes.UNAUTHORIZED);
    try {
        const token = payload.authorization.split('Bearer ')[1];
        jsonwebtoken_1.default.verify(token, JWT_SECRET !== null && JWT_SECRET !== void 0 ? JWT_SECRET : '');
        return {
            response: {},
            status: statusCodes_1.EStatusCodes.OK
        };
    }
    catch (tokenErr) {
        throw new errors_1.CustomError('TOKEN_ERROR', statusCodes_1.EStatusCodes.UNAUTHORIZED);
    }
};
exports.verifyToken = verifyToken;
