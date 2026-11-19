import { describe, expect, it } from "vitest";

import { levels } from "./levels.js";

describe("level registry", () => {
  it("uses unique slugs", () => {
    const slugs = levels.map((level) => level.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("only marks reviewed work as verified", () => {
    expect(levels.find((level) => level.slug === "hello-ethernaut")?.status).toBe(
      "verified",
    );
    expect(levels.find((level) => level.slug === "reentrance")?.status).toBe(
      "planned",
    );
  });
});
