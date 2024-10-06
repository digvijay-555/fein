'use client';

import React, { useState, useEffect } from 'react';// Ensure the correct import


const ConnectWalletButton = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);


  useEffect(() => {
    const checkMetaMask = () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        setMetaMaskInstalled(true);
      } else {
        setMetaMaskInstalled(false);
      }
    };

    checkMetaMask();
    window.addEventListener('load', checkMetaMask);

    return () => {
      window.removeEventListener('load', checkMetaMask);
    };
  }, []);

  const connectToWallet = async () => {
    if (metaMaskInstalled) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum?.request({
          method: 'eth_requestAccounts',
        });

        if (accounts && accounts.length > 0) {
          const wallet = accounts[0];
          setWalletAddress(wallet);
          setWalletConnected(true);
          console.log('Connected to wallet:', wallet);

          // Try to log in or create the user
          try {// Call your Prisma function
            console.log('User logged in or created successfully');
          } catch (error) {
            console.error('Error logging in user:', error);
            alert('Failed to log in or create the user.');
          }
        } else {
          alert('Please log into MetaMask and connect your wallet.');
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        alert('Failed to connect to the wallet. Please try again.');
      }
    } else {
      alert('MetaMask not found. Please install it.');
    }
  };

  return (
    <div>
      <button onClick={connectToWallet}>
        {walletConnected ? `Wallet Connected: ${walletAddress}` : 'Connect MetaMask Wallet'}
      </button>
      {!metaMaskInstalled && (
        <p>MetaMask is not installed. Please install the MetaMask extension.</p>
      )}
    </div>
  );
};

export default ConnectWalletButton;