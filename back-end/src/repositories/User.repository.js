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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @todo
 * - criar adapters pra resposta do banco e transformar de snake_case pra camelCase
 */
class UserRepository {
    constructor() {
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return {
                id: 1,
                passwordHash: '$2b$10$b1vft0gkw/3pBsh6HGqdtOEMW5OVqi919Awm2wpabVK4xwsgbS3my' // senhateste
            };
        });
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            return {
                id: 1,
                age: payload.age,
                email: payload.email,
                fullName: payload.fullName,
                profilePicUrl: payload.profilePicUrl
            };
        });
    }
}
exports.default = UserRepository;
