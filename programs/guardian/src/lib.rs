use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111"); // Replace with your program ID

#[program]
pub mod guardian {
    use super::*;

    // Initialize guardian registry
    pub fn initialize_registry(ctx: Context<InitializeRegistry>) -> Result<()> {
        let registry = &mut ctx.accounts.guardian_registry;
        let owner = &ctx.accounts.owner;

        registry.owner = owner.key();
        registry.guardians = Vec::new();

        Ok(())
    }

    // Add guardian with metadata
    pub fn add_guardian(
        ctx: Context<ManageGuardian>,
        address: Pubkey,
        name: Option<String>,
        email: Option<String>,
    ) -> Result<()> {
        let registry = &mut ctx.accounts.guardian_registry;
        let owner = &ctx.accounts.owner;

        // Only owner can add guardians
        require!(
            owner.key() == registry.owner,
            GuardianError::NotOwner
        );

        // Check if guardian already exists
        require!(
            !registry.guardians.iter().any(|g| g.address == address),
            GuardianError::GuardianAlreadyExists
        );

        // Add guardian with metadata
        registry.guardians.push(GuardianInfo {
            address,
            name,
            email,
            status: GuardianStatus::Pending,
            added_at: Clock::get()?.unix_timestamp,
            last_active: None,
        });

        Ok(())
    }

    // Remove guardian
    pub fn remove_guardian(
        ctx: Context<ManageGuardian>,
        address: Pubkey,
    ) -> Result<()> {
        let registry = &mut ctx.accounts.guardian_registry;
        let owner = &ctx.accounts.owner;

        // Only owner can remove guardians
        require!(
            owner.key() == registry.owner,
            GuardianError::NotOwner
        );

        // Find guardian index
        let guardian_index = registry.guardians.iter()
            .position(|g| g.address == address)
            .ok_or(GuardianError::GuardianNotFound)?;

        // Remove guardian
        registry.guardians.remove(guardian_index);

        Ok(())
    }

    // Update guardian status
    pub fn update_guardian_status(
        ctx: Context<ManageGuardian>,
        address: Pubkey,
        status: GuardianStatus,
    ) -> Result<()> {
        let registry = &mut ctx.accounts.guardian_registry;
        let owner = &ctx.accounts.owner;

        // Only owner can update guardian status
        require!(
            owner.key() == registry.owner,
            GuardianError::NotOwner
        );

        // Find guardian
        let guardian = registry.guardians.iter_mut()
            .find(|g| g.address == address)
            .ok_or(GuardianError::GuardianNotFound)?;

        // Update status
        guardian.status = status;
        
        // If activating, update last active timestamp
        if status == GuardianStatus::Active {
            guardian.last_active = Some(Clock::get()?.unix_timestamp);
        }

        Ok(())
    }

    // Guardian check-in
    pub fn guardian_checkin(ctx: Context<GuardianCheckin>) -> Result<()> {
        let registry = &mut ctx.accounts.guardian_registry;
        let guardian = &ctx.accounts.guardian;

        // Find guardian
        let guardian_info = registry.guardians.iter_mut()
            .find(|g| g.address == guardian.key())
            .ok_or(GuardianError::GuardianNotFound)?;

        // Update last active timestamp
        guardian_info.last_active = Some(Clock::get()?.unix_timestamp);
        
        // Ensure guardian is active
        guardian_info.status = GuardianStatus::Active;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeRegistry<'info> {
    #[account(init, payer = owner, space = 8 + 1000)]
    pub guardian_registry: Account<'info, GuardianRegistry>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ManageGuardian<'info> {
    #[account(mut)]
    pub guardian_registry: Account<'info, GuardianRegistry>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct GuardianCheckin<'info> {
    #[account(mut)]
    pub guardian_registry: Account<'info, GuardianRegistry>,
    pub guardian: Signer<'info>,
}

#[account]
pub struct GuardianRegistry {
    pub owner: Pubkey,
    pub guardians: Vec<GuardianInfo>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct GuardianInfo {
    pub address: Pubkey,
    pub name: Option<String>,
    pub email: Option<String>,
    pub status: GuardianStatus,
    pub added_at: i64,
    pub last_active: Option<i64>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum GuardianStatus {
    Pending,
    Active,
    Inactive,
}

#[error_code]
pub enum GuardianError {
    #[msg("Not the owner")]
    NotOwner,
    #[msg("Guardian already exists")]
    GuardianAlreadyExists,
    #[msg("Guardian not found")]
    GuardianNotFound,
}
