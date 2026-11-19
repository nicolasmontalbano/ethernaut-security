# Ethernaut Security Research

An evidence-driven study of smart-contract vulnerabilities using reproducible
Foundry tests and TypeScript automation. The goal is to transfer established
application-security practices—threat modeling, code review, exploit validation,
remediation, and clear risk communication—to EVM security.

> **Educational use only.** The code in this repository targets intentionally
> vulnerable training contracts. Do not use these techniques against systems
> without explicit authorization.

## Current status

This repository is in its foundation phase. Level 0 has been verified as an
onboarding workflow; no vulnerability level is claimed as completed yet. A
level is marked **verified** only when its applicable setup, interaction or
exploit, assertions, remediation analysis, commands, and professional write-up
can be reproduced and reviewed.

## Why this project

The project is designed to demonstrate security engineering skills relevant to
systems that move on-chain value:

- reasoning about EVM failure modes and trust boundaries;
- converting findings into regression tests and reusable tooling;
- distinguishing root cause, exploit conditions, impact, and remediation;
- communicating technical risk without overstating evidence.

Ethernaut is intentionally scoped to EVM fundamentals. It does not, by itself,
demonstrate production experience with custody systems, MPC/HSM integrations,
Solana, TON, Tron, or regulated tokenization infrastructure.

## Repository structure

```text
src/levels/       Local copies or minimal reproductions of vulnerable contracts
src/exploits/     Solidity exploit contracts
test/             Foundry exploit and remediation tests
cli/              Strict TypeScript CLI and per-level automation
writeups/         Professional English-language security analyses
```

## Prerequisites

- Git
- Node.js 22 or newer
- Foundry (`forge`, `cast`, and `anvil`)

Install Foundry using the official instructions for your operating system, then
confirm that `forge --version`, `cast --version`, and `anvil --version` work.

## Setup

```bash
git clone <repository-url>
cd ethernaut-security
npm ci
cp .env.example .env
forge install foundry-rs/forge-std@v1.17.0 --no-git
```

The `.env` file is ignored by Git. Never place funded keys, private RPC URLs, or
other secrets in the repository.

## Commands

```bash
npm run levels       # Show planned and verified levels
npm run typecheck    # Check strict TypeScript types
npm test             # Run TypeScript tests
forge test           # Run all Solidity tests
forge test -vvvv     # Run with detailed EVM traces
anvil                # Start a local development chain
```

Exploit/deployment commands will be added per level only after they are
implemented and verified.

## Analysis methodology

Every level follows the same evidence chain:

1. Describe the contract's intended behavior and assets at risk.
2. Identify trust boundaries, state transitions, and external interactions.
3. State the root cause and the exact exploit preconditions.
4. Build the smallest exploit that proves the hypothesis.
5. Reproduce the vulnerable state and impact in Foundry assertions.
6. Evaluate remediation and, when useful, add a regression test.
7. Automate safe local execution and document operational assumptions.
8. Review all code, commands, claims, and links from a clean checkout.

## Progress matrix

| Priority | Level | Vulnerability | Status | Exploit | Test | Write-up |
| --- | --- | --- | --- | --- | --- | --- |
| Foundation | Hello Ethernaut | Setup / blockchain interaction | Verified | [Foundry script](script/Level0Solution.s.sol) | [Foundry test](test/Level0.t.sol) | [Write-up](writeups/level-00-hello-ethernaut.md) |
| 1 | Re-entrancy | Reentrancy / unsafe external call ordering | Planned | — | — | — |

Additional levels will enter the matrix when their learning session begins.
Planned ordering emphasizes access control, storage layout, delegatecall and
proxies, denial of service, external calls, signatures and authorization, token
accounting, and contract creation/recovery.

## Technologies

- Solidity and the EVM
- Foundry: Forge, Cast, and Anvil
- TypeScript with strict compiler settings
- Node.js, viem, Commander, Zod, and Vitest

## Learning checkpoint for each level

Before a level is marked verified, the learner should be able to explain the
normal state transition, locate the vulnerable line or invariant, state the
exploit preconditions, predict the relevant balance/storage changes, and explain
why the proposed fix prevents the same class of bug.

