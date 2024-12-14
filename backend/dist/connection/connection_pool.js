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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query", "error"],
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Perform a simple query to ensure the connection works
            yield prisma.$connect();
            console.log('Database connected successfully');
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1); // Exit the process if the connection fails
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
main();
exports.default = prisma;
