import Fastify from "fastify";
import { projectRoutes } from "./routes/projects.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", async () => {
    return {
      status: "ok",
    };
  });

  app.register(projectRoutes);

  return app;
}