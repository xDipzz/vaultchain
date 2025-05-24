use anchor_lang::prelude::*;

declare_id!("recSnKaWtBYGCSPEu3PmeQZbEa6cqaRjTMoqgofFcAm");

#[program]
pub mod recovery {
    use super::*;

    // Initialize a new recovery system
    pub fn initialize_recovery(
        ctx: Context<InitializeRecovery>,
        guardians: Vec<Pubkey>,
        threshold: u8,
        checkin_period: i64,
        recovery_delay: i64,
    ) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        let owner = &ctx.accounts.owner;

        // Initialize recovery account data
        recovery_account.owner = owner.key();
        recovery_account.guardians = guardians;
        recovery_account.threshold = threshold;
        recovery_account.last_checkin = Clock::get()?.unix_timestamp;
        recovery_account.checkin_period = checkin_period;
        recovery_account.recovery_delay = recovery_delay;
        recovery_account.is_recovery_active = false;
        recovery_account.recovery_initiated_at = None;
        recovery_account.new_owner = None;
        recovery_account.guardian_votes = Vec::new();

        Ok(())
    }

    // Perform a check-in to confirm wallet access
    pub fn checkin(ctx: Context<Checkin>) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        
        // Update last check-in timestamp
        recovery_account.last_checkin = Clock::get()?.unix_timestamp;
        
        // If there's an active recovery, cancel it
        if recovery_account.is_recovery_active {
            recovery_account.is_recovery_active = false;
            recovery_account.recovery_initiated_at = None;
            recovery_account.new_owner = None;
            recovery_account.guardian_votes = Vec::new();
        }

        Ok(())
    }

    // Initiate recovery process
    pub fn initiate_recovery(
        ctx: Context<InitiateRecovery>,
        new_owner: Pubkey,
    ) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        let guardian = &ctx.accounts.guardian;
        
        // Verify this is a guardian
        require!(
            recovery_account.guardians.contains(&guardian.key()),
            RecoveryError::NotAGuardian
        );
        
        // Check if recovery is already active
        require!(
            !recovery_account.is_recovery_active,
            RecoveryError::RecoveryAlreadyActive
        );
        
        // Check if check-in period has passed
        let current_time = Clock::get()?.unix_timestamp;
        require!(
            current_time - recovery_account.last_checkin > recovery_account.checkin_period,
            RecoveryError::CheckinPeriodNotPassed
        );
        
        // Initialize recovery
        recovery_account.is_recovery_active = true;
        recovery_account.recovery_initiated_at = Some(current_time);
        recovery_account.new_owner = Some(new_owner);
        
        // Add initial vote from initiating guardian
        recovery_account.guardian_votes = vec![GuardianVote {
            guardian: guardian.key(),
            vote: true,
            timestamp: current_time,
        }];

        Ok(())
    }

    // Vote on recovery process
    pub fn vote_recovery(
        ctx: Context<VoteRecovery>,
        approve: bool,
    ) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        let guardian = &ctx.accounts.guardian;
        
        // Verify this is a guardian
        require!(
            recovery_account.guardians.contains(&guardian.key()),
            RecoveryError::NotAGuardian
        );
        
        // Check if recovery is active
        require!(
            recovery_account.is_recovery_active,
            RecoveryError::RecoveryNotActive
        );
        
        // Check if guardian has already voted
        require!(
            !recovery_account.guardian_votes.iter().any(|vote| vote.guardian == guardian.key()),
            RecoveryError::AlreadyVoted
        );
        
        // Add vote
        recovery_account.guardian_votes.push(GuardianVote {
            guardian: guardian.key(),
            vote: approve,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    // Execute recovery (transfer funds to new wallet)
    pub fn execute_recovery(ctx: Context<ExecuteRecovery>) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        let guardian = &ctx.accounts.guardian;
        
        // Verify this is a guardian
        require!(
            recovery_account.guardians.contains(&guardian.key()),
            RecoveryError::NotAGuardian
        );
        
        // Check if recovery is active
        require!(
            recovery_account.is_recovery_active,
            RecoveryError::RecoveryNotActive
        );
        
        // Check if recovery delay has passed
        let current_time = Clock::get()?.unix_timestamp;
        require!(
            current_time - recovery_account.recovery_initiated_at.unwrap() > recovery_account.recovery_delay,
            RecoveryError::RecoveryDelayNotPassed
        );
        
        // Check if threshold is met
        let approve_votes = recovery_account.guardian_votes.iter()
            .filter(|vote| vote.vote)
            .count() as u8;
        
        require!(
            approve_votes >= recovery_account.threshold,
            RecoveryError::ThresholdNotMet
        );
        
        // In a real implementation, you would transfer funds here
        // For now, just mark recovery as complete
        recovery_account.is_recovery_active = false;
        
        Ok(())
    }

    // Cancel recovery process
    pub fn cancel_recovery(ctx: Context<CancelRecovery>) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        
        // Check if recovery is active
        require!(
            recovery_account.is_recovery_active,
            RecoveryError::RecoveryNotActive
        );
        
        // Only owner can cancel recovery
        require!(
            ctx.accounts.owner.key() == recovery_account.owner,
            RecoveryError::NotOwner
        );
        
        // Reset recovery state
        recovery_account.is_recovery_active = false;
        recovery_account.recovery_initiated_at = None;
        recovery_account.new_owner = None;
        recovery_account.guardian_votes = Vec::new();
        
        Ok(())
    }

    // Add guardian
    pub fn add_guardian(
        ctx: Context<ManageGuardian>,
        guardian: Pubkey,
    ) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        
        // Only owner can add guardians
        require!(
            ctx.accounts.owner.key() == recovery_account.owner,
            RecoveryError::NotOwner
        );
        
        // Check if guardian already exists
        require!(
            !recovery_account.guardians.contains(&guardian),
            RecoveryError::GuardianAlreadyExists
        );
        
        // Add guardian
        recovery_account.guardians.push(guardian);
        
        Ok(())
    }

    // Remove guardian
    pub fn remove_guardian(
        ctx: Context<ManageGuardian>,
        guardian: Pubkey,
    ) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        
        // Only owner can remove guardians
        require!(
            ctx.accounts.owner.key() == recovery_account.owner,
            RecoveryError::NotOwner
        );
        
        // Check if guardian exists
        let guardian_index = recovery_account.guardians.iter()
            .position(|&g| g == guardian)
            .ok_or(RecoveryError::GuardianNotFound)?;
        
        // Remove guardian
        recovery_account.guardians.remove(guardian_index);
        
        Ok(())
    }

    // Update recovery settings
    pub fn update_settings(
        ctx: Context<UpdateSettings>,
        threshold: Option<u8>,
        checkin_period: Option<i64>,
        recovery_delay: Option<i64>,
    ) -> Result<()> {
        let recovery_account = &mut ctx.accounts.recovery_account;
        
        // Only owner can update settings
        require!(
            ctx.accounts.owner.key() == recovery_account.owner,
            RecoveryError::NotOwner
        );
        
        // Update settings if provided
        if let Some(threshold) = threshold {
            recovery_account.threshold = threshold;
        }
        
        if let Some(checkin_period) = checkin_period {
            recovery_account.checkin_period = checkin_period;
        }
        
        if let Some(recovery_delay) = recovery_delay {
            recovery_account.recovery_delay = recovery_delay;
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeRecovery<'info> {
    #[account(init, payer = owner, space = 8 + 1000)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Checkin<'info> {
    #[account(mut, has_one = owner)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct InitiateRecovery<'info> {
    #[account(mut)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    pub guardian: Signer<'info>,
}

#[derive(Accounts)]
pub struct VoteRecovery<'info> {
    #[account(mut)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    pub guardian: Signer<'info>,
}

#[derive(Accounts)]
pub struct ExecuteRecovery<'info> {
    #[account(mut)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    pub guardian: Signer<'info>,
    /// CHECK: This is the new owner account
    pub new_owner: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CancelRecovery<'info> {
    #[account(mut)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct ManageGuardian<'info> {
    #[account(mut)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateSettings<'info> {
    #[account(mut)]
    pub recovery_account: Account<'info, RecoveryAccount>,
    pub owner: Signer<'info>,
}

#[account]
pub struct RecoveryAccount {
    pub owner: Pubkey,
    pub guardians: Vec<Pubkey>,
    pub threshold: u8,
    pub last_checkin: i64,
    pub checkin_period: i64,
    pub recovery_delay: i64,
    pub is_recovery_active: bool,
    pub recovery_initiated_at: Option<i64>,
    pub new_owner: Option<Pubkey>,
    pub guardian_votes: Vec<GuardianVote>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct GuardianVote {
    pub guardian: Pubkey,
    pub vote: bool,
    pub timestamp: i64,
}

#[error_code]
pub enum RecoveryError {
    #[msg("Not a guardian")]
    NotAGuardian,
    #[msg("Recovery already active")]
    RecoveryAlreadyActive,
    #[msg("Recovery not active")]
    RecoveryNotActive,
    #[msg("Already voted")]
    AlreadyVoted,
    #[msg("Check-in period not passed")]
    CheckinPeriodNotPassed,
    #[msg("Recovery delay not passed")]
    RecoveryDelayNotPassed,
    #[msg("Threshold not met")]
    ThresholdNotMet,
    #[msg("Not the owner")]
    NotOwner,
    #[msg("Guardian already exists")]
    GuardianAlreadyExists,
    #[msg("Guardian not found")]
    GuardianNotFound,
}
