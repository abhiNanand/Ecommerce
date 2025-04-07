// Services/Payments/PaymentService.ts
import { ethers } from 'ethers';
import contractABI from './contractABI.json';

const CONTRACT_ADDRESS = "0xDEd42d7997d45dB3695336045f8E3273dd2AE1dd ";

export const payWithCrypto = async (amountInEth: string) => {
  if (!window.ethereum) throw new Error('MetaMask not detected');

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  const tx = await contract.pay({
    value: ethers.parseEther(amountInEth),
  });

  return await tx.wait(); // Wait for transaction confirmation
};
