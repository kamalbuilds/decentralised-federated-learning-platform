import { useState, useEffect } from 'react';
import { connect, WalletConnection } from 'near-api-js';

export function useWallet() {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    initializeWallet();
  }, []);

  const initializeWallet = async () => {
    try {
      const near = await connect({
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org'
      });

      const wallet = new WalletConnection(near, 'federated-learning-app');
      setWallet(wallet);

      if (wallet.isSignedIn()) {
        setAccount(wallet.getAccountId());
      }
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
    }
  };

  const connect = () => {
    wallet?.requestSignIn({
      contractId: process.env.NEXT_PUBLIC_CONTRACT_ID,
      methodNames: ['register_participant', 'distribute_rewards']
    });
  };

  const disconnect = () => {
    wallet?.signOut();
    setAccount(null);
  };

  return { wallet, account, connect, disconnect };
}