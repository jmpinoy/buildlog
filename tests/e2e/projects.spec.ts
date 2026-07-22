import { expect, test } from "@playwright/test";

test.describe("default React app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the starter page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Get started", level: 1 }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Count is 0" }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Explore Vite" }),
    ).toHaveAttribute("href", "https://vite.dev/");
  });

  test("increments the counter", async ({ page }) => {
    const counter = page.getByRole("button", { name: /count is/i });

    await expect(counter).toHaveText("Count is 0");

    await counter.click();

    await expect(counter).toHaveText("Count is 1");
  });
});