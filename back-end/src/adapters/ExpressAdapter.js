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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAdapter = void 0;
const statusCodes_1 = require("../domain/statusCodes");
const errors_1 = require("../utils/errors");
class ExpressAdapter {
}
exports.ExpressAdapter = ExpressAdapter;
_a = ExpressAdapter;
ExpressAdapter.performJson = (fn) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const callbackResponse = yield fn(Object.assign(Object.assign(Object.assign({}, req.query), req.body), req.params));
        res.status(callbackResponse.status).json(callbackResponse.response);
    }
    catch (err) {
        /**
         * The errors must always follow the array pattern
         *
         * Example: { errors: [ error1, error2 ] }
         */
        if (err instanceof errors_1.JoiValidationError) {
            return res.status(err.statusCode).json({ errors: err.messages });
        }
        res.status((_b = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _b !== void 0 ? _b : statusCodes_1.EStatusCodes.INTERNAL).json({
            errors: [err.message]
        });
    }
});
