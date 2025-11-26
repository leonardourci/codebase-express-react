"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Envs = exports.ENodeEnvs = void 0;
const joi_1 = __importDefault(require("joi"));
var ENodeEnvs;
(function (ENodeEnvs) {
    ENodeEnvs["DEVELOPMENT"] = "development";
    ENodeEnvs["PRODUCTION"] = "production";
    ENodeEnvs["TEST"] = "test";
})(ENodeEnvs || (exports.ENodeEnvs = ENodeEnvs = {}));
class Envs {
    constructor() {
        this.validate = (payload) => joi_1.default.object({
            NODE_ENV: joi_1.default.string().valid(Object.values(ENodeEnvs)).required(),
            REST_PORT: joi_1.default.number().integer().positive().required(),
            PG_CONNECTION_STRING: joi_1.default.string().required(),
            HASH_SALT: joi_1.default.number().integer().positive().required(),
            JWT_SECRET: joi_1.default.string().required(),
        }).validate(payload, { abortEarly: false });
        this.validate(process.env);
    }
    get nodeEnv() {
        return process.env.NODE_ENV;
    }
    get restPort() {
        return Number(process.env.REST_PORT);
    }
    get pgConnectionString() {
        return process.env.PG_CONNECTION_STRING;
    }
    get hashSalt() {
        return Number(process.env.HASH_SALT);
    }
}
exports.Envs = Envs;
