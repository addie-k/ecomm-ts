import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient(
    {
        log: ["query", "error"],
    }
)
async function main() {
    try {
        // Perform a simple query to ensure the connection works
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process if the connection fails
    } finally {
        await prisma.$disconnect();
    }
}

main();
export default prisma