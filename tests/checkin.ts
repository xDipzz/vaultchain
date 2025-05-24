import * as anchor from "@project-serum/anchor"
import type { Program } from "@project-serum/anchor"
import { Keypair, SystemProgram } from "@solana/web3.js"
import { expect } from "chai"
import type { Checkin } from "../target/types/checkin"
import { describe, it } from "mocha"

describe("checkin", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Checkin as Program<Checkin>

  // Test accounts
  const owner = Keypair.generate()

  // Checkin account
  const checkinAccount = Keypair.generate()

  // Test parameters
  const period = 60 * 60 * 24 * 30 // 30 days
  const reminderThreshold = 60 * 60 * 24 * 7 // 7 days

  it("Initialize check-in system", async () => {
    // Airdrop SOL to owner
    const airdropSig = await provider.connection.requestAirdrop(owner.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
    await provider.connection.confirmTransaction(airdropSig)

    // Initialize check-in system
    await program.methods
      .initializeCheckin(new anchor.BN(period), new anchor.BN(reminderThreshold))
      .accounts({
        checkinAccount: checkinAccount.publicKey,
        owner: owner.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner, checkinAccount])
      .rpc()

    // Fetch account and verify data
    const account = await program.account.checkinAccount.fetch(checkinAccount.publicKey)

    expect(account.owner.toString()).to.equal(owner.publicKey.toString())
    expect(account.period.toNumber()).to.equal(period)
    expect(account.reminderThreshold.toNumber()).to.equal(reminderThreshold)
    expect(account.lastCheckin.toNumber()).to.be.greaterThan(0)
    expect(account.nextCheckin.toNumber()).to.equal(account.lastCheckin.toNumber() + period)
    expect(account.missedCheckins).to.equal(0)
    expect(account.history.length).to.equal(0)
  })

  it("Perform check-in", async () => {
    // Perform check-in
    await program.methods
      .performCheckin()
      .accounts({
        checkinAccount: checkinAccount.publicKey,
        owner: owner.publicKey,
      })
      .signers([owner])
      .rpc()

    // Fetch account and verify data
    const account = await program.account.checkinAccount.fetch(checkinAccount.publicKey)

    // Check that last_checkin was updated
    expect(account.history.length).to.equal(1)
    expect(account.history[0].isLate).to.be.false
  })

  // Additional tests would be added here for:
  // - Updating settings
  // - Getting status
  // - Late check-ins
})
