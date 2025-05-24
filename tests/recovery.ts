import * as anchor from "@project-serum/anchor"
import type { Program } from "@project-serum/anchor"
import { Keypair, SystemProgram } from "@solana/web3.js"
import { expect } from "chai"
import type { Recovery } from "../target/types/recovery"
import { describe, it } from "mocha"

describe("recovery", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Recovery as Program<Recovery>

  // Test accounts
  const owner = Keypair.generate()
  const guardian1 = Keypair.generate()
  const guardian2 = Keypair.generate()
  const guardian3 = Keypair.generate()
  const newOwner = Keypair.generate()

  // Recovery account
  const recoveryAccount = Keypair.generate()

  // Test parameters
  const threshold = 2
  const checkinPeriod = 60 * 60 * 24 * 30 // 30 days
  const recoveryDelay = 60 * 60 * 24 * 3 // 3 days

  it("Initialize recovery system", async () => {
    // Airdrop SOL to owner
    const airdropSig = await provider.connection.requestAirdrop(owner.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.confirmTransaction(airdropSig)

    // Initialize recovery system
    await program.methods
      .initializeRecovery(
        [guardian1.publicKey, guardian2.publicKey, guardian3.publicKey],
        threshold,
        new anchor.BN(checkinPeriod),
        new anchor.BN(recoveryDelay),
      )
      .accounts({
        recoveryAccount: recoveryAccount.publicKey,
        owner: owner.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner, recoveryAccount])
      .rpc()

    // Fetch account and verify data
    const account = await program.account.recoveryAccount.fetch(recoveryAccount.publicKey)

    expect(account.owner.toString()).to.equal(owner.publicKey.toString())
    expect(account.guardians.length).to.equal(3)
    expect(account.threshold).to.equal(threshold)
    expect(account.checkinPeriod.toNumber()).to.equal(checkinPeriod)
    expect(account.recoveryDelay.toNumber()).to.equal(recoveryDelay)
    expect(account.isRecoveryActive).to.be.false
  })

  it("Perform check-in", async () => {
    // Perform check-in
    await program.methods
      .checkin()
      .accounts({
        recoveryAccount: recoveryAccount.publicKey,
        owner: owner.publicKey,
      })
      .signers([owner])
      .rpc()

    // Fetch account and verify data
    const account = await program.account.recoveryAccount.fetch(recoveryAccount.publicKey)

    // Check that last_checkin was updated
    expect(account.lastCheckin.toNumber()).to.be.greaterThan(0)
  })

  // Additional tests would be added here for:
  // - Initiating recovery
  // - Voting on recovery
  // - Executing recovery
  // - Canceling recovery
  // - Adding/removing guardians
  // - Updating settings
})
