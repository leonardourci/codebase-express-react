"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const adapters_1 = require("./adapters");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const jwt_1 = require("./utils/jwt");
const app = (0, express_1.default)();
// for preventing cors errors when fetching any route
app.options('*', (0, cors_1.default)());
app.use((0, cors_1.default)());
// to parse incoming JSON data from requests
app.use(express_1.default.json());
// login route with returns a token which needs to be used in all the next routes below the login one
app.use('/auth', auth_routes_1.default);
// all the requests below needs a JWT 'authorization' headers key
// example: { headers: { authorization: secret_example } }
app.use(adapters_1.ExpressAdapter.performJson(jwt_1.verifyToken));
exports.default = app;
