import { describe, expect, it } from "vitest";
import { createProjectSchema } from "./project.js";

describe("createProjectSchema", () => {
  it("accepts a valid project", () => {
    const result = createProjectSchema.safeParse({
      title: "BuildLog",
      slug: "buildlog",
      summary: "A portfolio project tracking application.",
      description: "A longer description of the project.",
      status: "IN_PROGRESS",
      featured: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid slug", () => {
    const result = createProjectSchema.safeParse({
      title: "BuildLog",
      slug: "Build Log",
      summary: "A portfolio project tracking application.",
      description: "A longer description of the project.",
    });

    expect(result.success).toBe(false);
  });
});