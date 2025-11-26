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
const BaseController_1 = __importDefault(require("./BaseController"));
const errors_1 = require("../utils/errors");
const Auth_service_1 = __importDefault(require("../domain/services/Auth.service"));
const statusCodes_1 = require("../domain/statusCodes");
const auth_validator_1 = require("../utils/validations/auth.validator");
class AuthController extends BaseController_1.default {
    constructor() {
        super(...arguments);
        this.authService = new Auth_service_1.default(this.repository);
        this.login = (payload) => __awaiter(this, void 0, void 0, function* () {
            const { value, error } = (0, auth_validator_1.validateLoginPayload)(payload);
            if (error)
                throw new errors_1.JoiValidationError(error);
            return {
                response: yield this.authService.login(value),
                status: statusCodes_1.EStatusCodes.OK
            };
        });
        this.signup = (payload) => __awaiter(this, void 0, void 0, function* () {
            const { value, error } = (0, auth_validator_1.validateSignupPayload)(payload);
            if (error)
                throw new errors_1.JoiValidationError(error);
            return {
                response: yield this.authService.signup(value),
                status: statusCodes_1.EStatusCodes.OK
            };
        });
    }
}
exports.default = AuthController;
