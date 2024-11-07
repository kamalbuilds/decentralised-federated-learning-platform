"use client"

import { useState, useEffect } from "react"
import { connect, Contract, WalletConnection } from "near-api-js"

export function useNearWallet() {
  const [wallet, setWallet] = useState<WalletConnection | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    initializeWallet()
  }, [])

  const initializeWallet = async () => {
    try {
      const near = await connect({
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
      })

      const wallet = new WalletConnection(near, "federated-learning")
      setWallet(wallet)

      if (wallet.isSignedIn()) {
        const contract = new Contract(wallet.account(), "contract-id", {
          viewMethods: ["get_participants", "get_model_status"],
          changeMethods: ["register_participant", "submit_update"],
        })
        setContract(contract)
        setIsConnected(true)
      }
    } catch (error) {
      console.error("Failed to initialize wallet:", error)
    }
  }

  return { wallet, contract, isConnected, initializeWallet }
}