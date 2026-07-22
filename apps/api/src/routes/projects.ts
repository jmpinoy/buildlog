import type { FastifyInstance } from "fastify";
import { createProjectSchema } from "@buildlog/contracts";
import { prisma } from "../lib/prisma.js";

export async function projectRoutes(app: FastifyInstance) {
  app.get("/api/projects", async () => {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: projects,
    };
  });

  app.post("/api/projects", async (request, reply) => {
    const result = createProjectSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({
        error: {
          code: "INVALID_REQUEST",
          message: "The project data is invalid.",
          details: result.error.flatten(),
        },
      });
    }

    const project = await prisma.project.create({
      data: result.data,
    });

    return reply.status(201).send({
      data: project,
    });
  });
}