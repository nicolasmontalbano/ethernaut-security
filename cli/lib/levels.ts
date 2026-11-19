export type LevelStatus = "planned" | "in-progress" | "verified";

export interface LevelMetadata {
  readonly slug: string;
  readonly name: string;
  readonly vulnerability: string;
  readonly status: LevelStatus;
}

// A level becomes "verified" only after its exploit, Foundry test, CLI path,
// and write-up have all been reviewed and reproduced from a clean checkout.
export const levels: readonly LevelMetadata[] = [
  {
    slug: "hello-ethernaut",
    name: "Hello Ethernaut",
    vulnerability: "Setup / blockchain interaction",
    status: "verified",
  },
  {
    slug: "reentrance",
    name: "Re-entrancy",
    vulnerability: "Reentrancy / unsafe external call ordering",
    status: "planned",
  },
];
