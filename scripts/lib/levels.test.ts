import { describe, expect, it } from "vitest";

import { levels } from "./levels.js";

describe("level registry", () => {
  it("uses unique slugs", () => {
    const slugs = levels.map((level) => level.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("does not claim unfinished work is verified", () => {
    expect(levels.every((level) => level.status === "planned")).toBe(true);
  });
});

