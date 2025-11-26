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
const bcrypt_1 = __importDefault(require("bcrypt"));
const BaseService_1 = __importDefault(require("./BaseService"));
const jwt_1 = require("../../utils/jwt");
const errors_1 = require("../../utils/errors");
const statusCodes_1 = require("../statusCodes");
const { HASH_SALT } = process.env;
class AuthService extends BaseService_1.default {
    constructor() {
        super(...arguments);
        this.login = (payload) => __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.repository.user.getUserByEmail(payload.email);
            const isValidPassword = bcrypt_1.default.compareSync(payload.password, userInfo.passwordHash);
            if (!isValidPassword)
                throw new errors_1.CustomError('Username or password is wrong', statusCodes_1.EStatusCodes.UNAUTHORIZED);
            return { token: (0, jwt_1.generateToken)({ userId: userInfo.id }) };
        });
        this.signup = (payload) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const passwordHash = bcrypt_1.default.hashSync(payload.password, (_a = Number(HASH_SALT)) !== null && _a !== void 0 ? _a : '');
            return this.repository.user.create(Object.assign(Object.assign({}, payload), { password: passwordHash }));
        });
    }
}
exports.default = AuthService;
