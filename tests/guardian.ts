import * as anchor from "@project-serum/anchor"
import type { Program } from "@project-serum/anchor"
import { Keypair, SystemProgram } from "@solana/web3.js"
import { expect } from "chai"
import type { Guardian } from "../target/types/guardian"
import { describe, it } from "mocha"

describe("guardian", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Guardian as Program<Guardian>

  // Test accounts
  const owner = Keypair.generate()
  const guardian1 = Keypair.generate()
  const guardian2 = Keypair.generate()

  // Guardian registry account
  const guardianRegistry = Keypair.generate()

  it("Initialize guardian registry", async () => {
    // Airdrop SOL to owner
    const airdropSig = await provider.connection.requestAirdrop(owner.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.confirmTransaction(airdropSig)

    // Initialize guardian registry
    await program.methods
      .initializeRegistry()
      .accounts({
        guardianRegistry: guardianRegistry.publicKey,
        owner: owner.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner, guardianRegistry])
      .rpc()

    // Fetch account and verify data
    const account = await program.account.guardianRegistry.fetch(guardianRegistry.publicKey)

    expect(account.owner.toString()).to.equal(owner.publicKey.toString())
    expect(account.guardians.length).to.equal(0)
  })

  it("Add guardian with metadata", async () => {
    // Add guardian
    await program.methods
      .addGuardian(guardian1.publicKey, "Sarah Johnson", "sarah@example.com")
      .accounts({
        guardianRegistry: guardianRegistry.publicKey,
        owner: owner.publicKey,
      })
      .signers([owner])
      .rpc()

    // Fetch account and verify data
    const account = await program.account.guardianRegistry.fetch(guardianRegistry.publicKey)

    expect(account.guardians.length).to.equal(1)
    expect(account.guardians[0].address.toString()).to.equal(guardian1.publicKey.toString())
    expect(account.guardians[0].name).to.equal("Sarah Johnson")
    expect(account.guardians[0].email).to.equal("sarah@example.com")
    expect(account.guardians[0].status.pending).to.not.be.undefined
  })

  // Additional tests would be added here for:
  // - Removing guardians
  // - Updating guardian status
  // - Guardian check-in
})
