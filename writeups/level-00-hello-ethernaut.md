# Level 0 — Hello Ethernaut

## Status

Verified on Ethereum Sepolia. This is an onboarding level, not a vulnerability
exploit.

## Summary

Hello Ethernaut introduces the interaction model used throughout the wargame. A
player receives a dedicated contract instance, reads its public interface, finds
the configured password, and submits that password through a state-changing
transaction.

The exercise demonstrates the difference between public blockchain state and a
secret, as well as the operational difference between an RPC read, a simulated
transaction, and a signed transaction included in a block.

## Expected contract behavior

The instance stores a password supplied by its constructor. A sequence of pure
information functions guides the player toward the public `password()` getter.
Calling `authenticate(string)` with the stored value changes the private
`cleared` flag from `false` to `true`. The Ethernaut factory validates completion
by calling `getCleared()`.

## Security concept and root cause

The level intentionally declares the password as a public state variable:

```solidity
string public password;
```

Solidity generates a getter for every public state variable. More generally,
contract storage is observable even when a variable is declared `private`.
Solidity visibility controls access from contract code; it does not provide
confidentiality.

There is no accidental vulnerability to exploit in this onboarding level. The
security lesson is that plaintext secrets must not be placed on a public
blockchain.

## Preconditions

- A player-created Level 0 instance on a supported Ethernaut network.
- An RPC endpoint for that network.
- A laboratory wallet with enough testnet ETH for one transaction.
- The instance address and ABI-compatible `Level0` contract type.

## Resolution process

1. Read `password()` through an RPC call. This uses `eth_call`, requires no
   signature, and does not change state.
2. Confirm that `getCleared()` initially returns `false`.
3. Simulate the Foundry script against a fork of the current Sepolia state.
4. Record `authenticate(password)` between `vm.startBroadcast()` and
   `vm.stopBroadcast()`.
5. Broadcast the recorded transaction with an encrypted Foundry keystore.
6. Read `getCleared()` independently after mining and confirm that it returns
   `true`.
7. Submit the instance through the Ethernaut interface.

## Implementation

- Vulnerable/training contract reproduction: [`src/levels/Level0.sol`](../src/levels/Level0.sol)
- Sepolia interaction script: [`script/Level0Solution.s.sol`](../script/Level0Solution.s.sol)
- Reproducible Foundry test: [`test/Level0.t.sol`](../test/Level0.t.sol)

The script binds the `Level0` type to the player's existing instance address.
This cast does not deploy a contract; it instructs Solidity to encode calls for
the `Level0` interface and send them to that address.

## Test evidence

The Foundry suite covers three cases:

1. The constructor stores the expected password and initializes `cleared` to
   `false`.
2. Authenticating with the stored password changes `cleared` to `true`.
3. Authenticating with an incorrect password leaves `cleared` as `false`.

Run the focused suite with:

```bash
forge test --match-contract Level0Test -vvv
```

## On-chain evidence

- Network: Ethereum Sepolia (`chainId` 11155111)
- Instance: [`0xe51CB17aE5f1027a50769a7bB97a1eD238B154D3`](https://sepolia.etherscan.io/address/0xe51CB17aE5f1027a50769a7bB97a1eD238B154D3)
- Transaction: [`0xb2b03fae0e3138bb98f0c08d8c670b3b294343ffb4d805f2d2bc20915b09b55f`](https://sepolia.etherscan.io/tx/0xb2b03fae0e3138bb98f0c08d8c670b3b294343ffb4d805f2d2bc20915b09b55f)
- Block: `12166014`
- Receipt status: success
- Gas used: `129115`
- Independently verified post-state: `getCleared() == true`

## Impact

Within the exercise, reading the public password allows any caller to satisfy
the authentication condition. In a production system, using on-chain plaintext
as an authentication secret would provide no authorization boundary and could
lead to unauthorized state changes or asset movement.

## Remediation

The training level is intentionally designed this way and does not require a
fix. For a production design:

- do not store plaintext credentials or encryption keys on-chain;
- do not rely on `private` visibility for confidentiality;
- authenticate callers through addresses, signatures, roles, or capability
  systems appropriate to the threat model;
- when hidden input is genuinely required, consider commit-reveal schemes,
  zero-knowledge proofs, or an explicitly trusted off-chain component.

## Audit takeaway

Treat all contract state, transaction calldata, events, bytecode, and historical
state as observable. When a design claims that an on-chain value is secret, the
auditor should challenge the trust assumption before reviewing implementation
details. The correct question is not only whether Solidity exposes a getter,
but whether the protocol remains secure when every stored value is known.

