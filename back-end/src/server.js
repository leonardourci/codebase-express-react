"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const { REST_PORT, ENVIRONMENT } = process.env;
const PORT = Number(REST_PORT);
app_1.default.listen(PORT, () => {
    if (ENVIRONMENT === 'development')
        console.log(`Local server is running at http://localhost:${PORT}`);
    if (ENVIRONMENT === 'production')
        console.log(`Server is running at port ${PORT}`);
});
