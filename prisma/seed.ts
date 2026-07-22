import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.project.upsert({
    where: {
      slug: "buildlog",
    },
    update: {},
    create: {
      title: "BuildLog",
      slug: "buildlog",
      summary: "A portfolio application for tracking software projects.",
      description:
        "Built with React, Fastify, PostgreSQL, Prisma, Vitest, and Playwright.",
      status: "IN_PROGRESS",
      featured: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });