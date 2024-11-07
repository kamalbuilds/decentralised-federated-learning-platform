import { WalletConnection, Contract } from "near-api-js";

export interface ModelUpdate {
  weights: number[];
  accuracy: number;
  timestamp: number;
}

export interface ModelStatus {
  total_updates: number;
  last_update: ModelUpdate | null;
  total_participants: number;
}

export interface FederatedLearningContract extends Contract {
  register_participant: (args: { name: string }) => Promise<void>;
  submit_model_update: (args: { weights: number[], accuracy: number }) => Promise<void>;
  get_model_status: () => Promise<ModelStatus>;
}

export class FederatedLearning {
  constructor(
    private readonly walletConnection: WalletConnection,
    private readonly contractId: string
  ) {}

  private get contract(): FederatedLearningContract {
    return new Contract(
      this.walletConnection.account(),
      this.contractId,
      {
        viewMethods: ['get_model_status'],
        changeMethods: ['register_participant', 'submit_model_update']
      }
    ) as FederatedLearningContract;
  }

  async registerParticipant(name: string): Promise<void> {
    return await this.contract.register_participant({ name });
  }

  async submitModelUpdate(weights: number[], accuracy: number): Promise<void> {
    return await this.contract.submit_model_update({ weights, accuracy });
  }

  async getModelStatus(): Promise<ModelStatus> {
    return await this.contract.get_model_status();
  }
}