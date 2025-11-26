"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adapters_1 = require("../adapters");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const repositories_1 = __importDefault(require("../repositories"));
const router = express_1.default.Router();
const authController = new AuthController_1.default(repositories_1.default);
router.post('/login', adapters_1.ExpressAdapter.performJson(authController.login));
router.post('/signup', adapters_1.ExpressAdapter.performJson(authController.signup));
exports.default = router;
