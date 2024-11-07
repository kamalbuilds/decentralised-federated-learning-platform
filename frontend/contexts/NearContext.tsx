import { createContext, useContext, useEffect, useState } from 'react';
import { connect, WalletConnection } from 'near-api-js';
import { FederatedLearning } from '../utils/near-interface';

interface NearContextType {
  walletConnection: WalletConnection | null;
  contract: FederatedLearning | null;
  signIn: () => void;
  signOut: () => void;
  isSignedIn: boolean;
}

const NearContext = createContext<NearContextType>({
  walletConnection: null,
  contract: null,
  signIn: () => {},
  signOut: () => {},
  isSignedIn: false,
});

export function NearProvider({ children }: { children: React.ReactNode }) {
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null);
  const [contract, setContract] = useState<FederatedLearning | null>(null);

  useEffect(() => {
    const initNear = async () => {
      const near = await connect({
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
      });

      const walletConnection = new WalletConnection(near, 'federated-learning');
      setWalletConnection(walletConnection);

      if (walletConnection.isSignedIn()) {
        const contract = new FederatedLearning(
          walletConnection,
          'contract.near' // Replace with your actual contract ID
        );
        setContract(contract);
      }
    };

    initNear();
  }, []);

  const signIn = () => {
    walletConnection?.requestSignIn({
      contractId: 'federated-learning.testnet',
      keyType: 'ed25519',
    });
  };

  const signOut = () => {
    walletConnection?.signOut();
    window.location.reload();
  };

  return (
    <NearContext.Provider
      value={{
        walletConnection,
        contract,
        signIn,
        signOut,
        isSignedIn: walletConnection?.isSignedIn() || false,
      }}
    >
      {children}
    </NearContext.Provider>
  );
}

export const useNear = () => useContext(NearContext);