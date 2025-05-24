use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111"); // Replace with your program ID

#[program]
pub mod checkin {
    use super::*;

    // Initialize check-in system
    pub fn initialize_checkin(
        ctx: Context<InitializeCheckin>,
        period: i64,
        reminder_threshold: i64,
    ) -> Result<()> {
        let checkin_account = &mut ctx.accounts.checkin_account;
        let owner = &ctx.accounts.owner;

        checkin_account.owner = owner.key();
        checkin_account.period = period;
        checkin_account.reminder_threshold = reminder_threshold;
        checkin_account.last_checkin = Clock::get()?.unix_timestamp;
        checkin_account.next_checkin = checkin_account.last_checkin + period;
        checkin_account.missed_checkins = 0;
        checkin_account.history = Vec::new();

        Ok(())
    }

    // Perform check-in
    pub fn perform_checkin(ctx: Context<PerformCheckin>) -> Result<()> {
        let checkin_account = &mut ctx.accounts.checkin_account;
        let owner = &ctx.accounts.owner;
        let current_time = Clock::get()?.unix_timestamp;

        // Only owner can check in
        require!(
            owner.key() == checkin_account.owner,
            CheckinError::NotOwner
        );

        // Record check-in
        checkin_account.history.push(CheckinRecord {
            timestamp: current_time,
            is_late: current_time > checkin_account.next_checkin,
        });

        // Limit history size
        if checkin_account.history.len() > 10 {
            checkin_account.history.remove(0);
        }

        // Update check-in status
        checkin_account.last_checkin = current_time;
        checkin_account.next_checkin = current_time + checkin_account.period;
        
        // Reset missed checkins if this was a late check-in
        if current_time > checkin_account.next_checkin {
            checkin_account.missed_checkins += 1;
        } else {
            checkin_account.missed_checkins = 0;
        }

        Ok(())
    }

    // Update check-in settings
    pub fn update_settings(
        ctx: Context<UpdateSettings>,
        period: Option<i64>,
        reminder_threshold: Option<i64>,
    ) -> Result<()> {
        let checkin_account = &mut ctx.accounts.checkin_account;
        let owner = &ctx.accounts.owner;

        // Only owner can update settings
        require!(
            owner.key() == checkin_account.owner,
            CheckinError::NotOwner
        );

        // Update settings if provided
        if let Some(period) = period {
            checkin_account.period = period;
            // Recalculate next check-in
            checkin_account.next_checkin = checkin_account.last_checkin + period;
        }

        if let Some(reminder_threshold) = reminder_threshold {
            checkin_account.reminder_threshold = reminder_threshold;
        }

        Ok(())
    }

    // Get check-in status
    pub fn get_status(ctx: Context<GetStatus>) -> Result<CheckinStatus> {
        let checkin_account = &ctx.accounts.checkin_account;
        let current_time = Clock::get()?.unix_timestamp;

        let time_until_next = checkin_account.next_checkin - current_time;
        let is_overdue = time_until_next < 0;
        let needs_reminder = time_until_next <= checkin_account.reminder_threshold;

        Ok(CheckinStatus {
            last_checkin: checkin_account.last_checkin,
            next_checkin: checkin_account.next_checkin,
            time_until_next,
            is_overdue,
            needs_reminder,
            missed_checkins: checkin_account.missed_checkins,
        })
    }
}

#[derive(Accounts)]
pub struct InitializeCheckin<'info> {
    #[account(init, payer = owner, space = 8 + 1000)]
    pub checkin_account: Account<'info, CheckinAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PerformCheckin<'info> {
    #[account(mut)]
    pub checkin_account: Account<'info, CheckinAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateSettings<'info> {
    #[account(mut)]
    pub checkin_account: Account<'info, CheckinAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetStatus<'info> {
    pub checkin_account: Account<'info, CheckinAccount>,
}

#[account]
pub struct CheckinAccount {
    pub owner: Pubkey,
    pub period: i64,
    pub reminder_threshold: i64,
    pub last_checkin: i64,
    pub next_checkin: i64,
    pub missed_checkins: u8,
    pub history: Vec<CheckinRecord>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CheckinRecord {
    pub timestamp: i64,
    pub is_late: bool,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CheckinStatus {
    pub last_checkin: i64,
    pub next_checkin: i64,
    pub time_until_next: i64,
    pub is_overdue: bool,
    pub needs_reminder: bool,
    pub missed_checkins: u8,
}

#[error_code]
pub enum CheckinError {
    #[msg("Not the owner")]
    NotOwner,
}
