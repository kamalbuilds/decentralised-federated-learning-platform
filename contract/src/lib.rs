use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, NearToken, Promise};
use near_sdk::collections::{UnorderedMap, Vector};
use schemars::JsonSchema;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, JsonSchema)]
#[serde(crate = "near_sdk::serde")]
pub struct ModelUpdate {
    pub shape: Vec<i32>,
    pub data: Vec<f32>,
    pub timestamp: u64,
    pub metrics: ModelMetrics,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, JsonSchema)]
#[serde(crate = "near_sdk::serde")]
pub struct ModelMetrics {
    pub loss: f32,
    pub accuracy: f32,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Participant {
    pub id: AccountId,
    pub name: String,
    pub status: ParticipantStatus,
    pub last_update: u64,
    pub contribution: u32,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, JsonSchema)]
#[serde(crate = "near_sdk::serde")]
pub enum ParticipantStatus {
    Active,
    Inactive,
}

#[derive(Serialize, Deserialize, JsonSchema)]
#[serde(crate = "near_sdk::serde")]
pub struct ModelStatus {
    pub total_updates: u64,
    pub last_update: Option<ModelUpdate>,
    pub total_participants: u64,
}

#[derive(BorshDeserialize, BorshSerialize)]
#[near_bindgen]
pub struct FederatedLearning {
    pub owner_id: AccountId,
    pub participants: UnorderedMap<AccountId, Participant>,
    pub model_updates: Vector<ModelUpdate>,
    pub total_rewards: NearToken,
}

#[near_bindgen]
impl FederatedLearning {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            participants: UnorderedMap::new(b"p"),
            model_updates: Vector::new(b"m"),
            total_rewards: NearToken::from_near(0),
        }
    }

    #[payable]
    pub fn register_participant(&mut self, name: String) {
        let account_id = env::predecessor_account_id();
        assert!(!self.participants.get(&account_id).is_some(), "Already registered");

        let participant = Participant {
            id: account_id.clone(),
            name,
            status: ParticipantStatus::Active,
            last_update: env::block_timestamp(),
            contribution: 0,
        };

        self.participants.insert(&account_id, &participant);
    }

    pub fn submit_update(&mut self, update: ModelUpdate) {
        let account_id = env::predecessor_account_id();
        assert!(self.participants.get(&account_id).is_some(), "Not registered");

        self.model_updates.push(&update);

        if let Some(mut participant) = self.participants.get(&account_id) {
            participant.contribution += 1;
            participant.last_update = env::block_timestamp();
            self.participants.insert(&account_id, &participant);
        }

        self.distribute_rewards(&account_id);
    }

    pub fn get_all_participants(&self) -> Vec<AccountId> {
        self.participants.keys().collect()
    }

    pub fn get_model_status(&self) -> ModelStatus {
        ModelStatus {
            total_updates: self.model_updates.len(),
            last_update: self.model_updates.get(self.model_updates.len().saturating_sub(1)),
            total_participants: self.participants.len(),
        }
    }

    fn distribute_rewards(&mut self, account_id: &AccountId) {
        let reward_amount = env::attached_deposit();
        if reward_amount > NearToken::from_near(0) {
            Promise::new(account_id.clone()).transfer(reward_amount);
        }
    }
}

impl Default for FederatedLearning {
    fn default() -> Self {
        Self::new(AccountId::try_from("contract.near".to_string()).unwrap())
    }
}
