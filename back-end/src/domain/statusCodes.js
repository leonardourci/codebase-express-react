"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStatusCodes = void 0;
var EStatusCodes;
(function (EStatusCodes) {
    EStatusCodes[EStatusCodes["OK"] = 200] = "OK";
    EStatusCodes[EStatusCodes["CREATED"] = 201] = "CREATED";
    EStatusCodes[EStatusCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    EStatusCodes[EStatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    EStatusCodes[EStatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    EStatusCodes[EStatusCodes["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    EStatusCodes[EStatusCodes["CONFLICT"] = 409] = "CONFLICT";
    EStatusCodes[EStatusCodes["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    EStatusCodes[EStatusCodes["UNPROCESSABLE"] = 422] = "UNPROCESSABLE";
    EStatusCodes[EStatusCodes["INTERNAL"] = 500] = "INTERNAL";
})(EStatusCodes || (exports.EStatusCodes = EStatusCodes = {}));
