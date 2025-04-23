// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';
// import { RootState } from '../../../../Store';
// import { addToOrderHistory } from '../../../../Services/Order/order';
// import { removePreviousAddress } from '../../../../Store/Address/AddressSlice';
// import { ROUTES } from '../../../../Shared/Constants';
// import { removeFromCart } from '../../../../Services/Cart/CartService';

// import './Payment.scss';
// import { Product } from '../../../../Shared/Product';
// import { updateCartItem } from '../../../../Store/Item/total_item_slice';

// interface ItemProps {
//   Items: Product[];
//   deleteCartItems:boolean;
//   total:string;
// }

// function Payment({ Items,deleteCartItems,total }: ItemProps) {
//   const [account, setAccount] = useState<string | null>(null);
//   const [transactionHash, setTransactionHash] = useState<string>('');
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);
//   const [paymentStatus, setPaymentStatus] = useState<
//     'success' | 'failure' | null
//   >(null);
//   const [open, setOpen] = useState<boolean>(false);
//   const address = useSelector((state: RootState) => state.address);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const payTotal=(0.0001*Number(total)).toFixed(4);

//   const connectWallet = async (): Promise<void> => {
//     if ((window as any).ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider((window as any).ethereum);
//         await provider.send('wallet_requestPermissions', [{ eth_accounts: {} }]);

//         const accounts: string[] = await provider.send(
//           'eth_requestAccounts',
//           []
//         );
//         console.log("hi->",accounts);
//         console.log("ki",accounts[0]);
//         setAccount(accounts[0]);
//       } catch (err) {
//         toast.error('Failed to connect wallet:');
//       }
//     } else {
//       toast.error('MetaMask not found! Please install it first.');
//     }
//   };

//   const sendPayment = async (): Promise<void> => {
//     if (!account) {
//       toast.warning('Please connect your wallet first');
//       return;
//     }
//     if (address.name.trim() == '') {
//       toast.error('address not selected');
//       return;
//     }
//     setIsProcessing(true);
//     setPaymentStatus(null);
//     setTransactionHash('');

//     try {
//       const provider = new ethers.BrowserProvider((window as any).ethereum);
//       const signer = await provider.getSigner();
//       const receiverAddress = '0x1D7e62a808fC888764cfB26D3FD58A0A81DC4886';
//       const amount = ethers.parseEther(`${payTotal}`);

//       const balance = await provider.getBalance(account);
//       if (balance < amount) {
//         throw new Error(`Insufficient funds for ${payTotal} ETH + gas`);
//       }

//       const transaction = await signer.sendTransaction({
//         to: receiverAddress,
//         value: amount,
//       });

//       setTransactionHash(transaction.hash);
//       setPaymentStatus('success');
//       addToOrderHistory(Items, address);
//       dispatch(removePreviousAddress());

//       if(deleteCartItems)
//       {
//         await Promise.all(
//           Items.map(async(item)=>{
//           await removeFromCart(item.id);
//           })
//         );
//         dispatch(updateCartItem(0));
//       }

//       setTimeout(() => setOpen(true), 2000);
  
//     } catch (err) {
//       console.error('Transaction failed:', err);
//       setPaymentStatus('failure');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleDisconnect = () => {
//     setAccount(null);
//     toast.info('Wallet disconnected');
//   };
  
//   return (
//     <div className="payment-gateway">
//       {account&&(<p>account={account}</p>)}
//       <button
//   className={`connect-button ${account ? 'connected' : ''}`}
//   onClick={account ? handleDisconnect : connectWallet}
// >

//   {account
//     ?  `Disconnect`
//     : 'Connect Wallet'}
// </button>

//       {account && (
//         <button
//           className={`send-button ${isProcessing ? 'processing' : ''}`}
//           onClick={sendPayment}
//           disabled={isProcessing}
//         >
//           {isProcessing ? <p> Processing...</p> : <p>Pay {payTotal}ETH</p>}
//         </button>
//       )}

//       {transactionHash && (
//         <div className="transaction-info">
//           <a
//             href={`https://holesky.etherscan.io/tx/${transactionHash}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="tx-link"
//           >
//             View Transaction on Etherscan
//           </a>
//         </div>
//       )}

//       {paymentStatus && (
//         <div className={`status-message ${paymentStatus}`}>
//           {paymentStatus === 'success'
//             ? '✅ Payment successfully sent!'
//             : '❌ Payment failed. Please try again.'}
//         </div>
//       )}

//       {open && (
//         <div className="place-order-container">
//           <div className="place-order">
//             <h2>Order Confirmed</h2>
//             <p>Your order will be placed successfully!</p>
//             <button
//               type="button"
//               className="place-order-btn"
//               onClick={() => navigate(ROUTES.ORDER)}
//             >
//               View Order
//             </button>
//             <br />
//             <button
//               className="place-order-btn"
//               onClick={() => {
//                 navigate(ROUTES.HOMEPAGE);
//                 setOpen(false);
//               }}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Payment;


// import { Product } from "../../../../Shared/Product";

// interface ItemProps {
//   Items: Product[];
//   deleteCartItems:boolean;
//   total:string;
// }


// import { useSendTransaction, useAccount, useReadContract } from 'wagmi';
// import { parseEther } from 'viem'
// import NFTContractABI from './NFTContract.json';


// const NFTContractAddress = '0xE32383aB1dbea75Fa416CB7cA200b0e1c89735AC'
// const paymentAddress = '0x1D7e62a808fC888764cfB26D3FD58A0A81DC4886'

// export default function Payment({ Items,deleteCartItems,total }: ItemProps) {
//   console.log(Items,deleteCartItems,total);

  
//     const { address } = useAccount()
    
//     const { data: balance } = useReadContract({
//       abi: NFTContractABI,
//       address: NFTContractAddress,
//       functionName: 'balanceOf',
//       args: [address ?? '0x0']
//     })
   
//     const { 
//       sendTransaction,
//       isPending,
//       isSuccess,
//       error 
//     } = useSendTransaction()
  
//     const handlePayment = async () => {
//       sendTransaction({
//         to: paymentAddress,
//         value: parseEther('0.0001')
//       })
//     }
  
//     return (
//       <div>
//         <appkit-button />
        
//         {address && (
//           <div className="container">
           
//             <div className="nft-section">
//               <h2>Your NFTs</h2>
//               <p>Balance: {balance?.toString() || '0'}</p>
//             </div>
            
           
//             <div className="payment-section">
//               <h2>Send Payment</h2>
//               <p>Send 0.0001 ETH to:</p>
//               <p className="address">{paymentAddress}</p>
              
//               <button 
//                 onClick={handlePayment}
//                 disabled={isPending}
//               >
//                 {isPending ? 'Sending...' : 'Send Payment'}
//               </button>
              
//               {isSuccess && <p className="success">Payment sent!</p>}
//               {error && <p className="error">Error: {error.message}</p>}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSendTransaction, useAccount, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { RootState } from '../../../../Store';
import { Product } from '../../../../Shared/Product';
import { ROUTES } from '../../../../Shared/Constants';
import { addToOrderHistory } from '../../../../Services/Order/order';
import { removePreviousAddress } from '../../../../Store/Address/AddressSlice';
import { removeFromCart } from '../../../../Services/Cart/CartService';
import { updateCartItem } from '../../../../Store/Item/total_item_slice';
import NFTContractABI from './NFTContract.json';

interface ItemProps {
  Items: Product[];
  deleteCartItems: boolean;
  total: string;
}

const NFTContractAddress = '0xE32383aB1dbea75Fa416CB7cA200b0e1c89735AC';
const paymentAddress = '0x1D7e62a808fC888764cfB26D3FD58A0A81DC4886';

export default function Payment({ Items, deleteCartItems, total }: ItemProps) {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payTotal = (0.0001 * Number(total)).toFixed(4); // simplified for demo

  const userAddress = useSelector((state: RootState) => state.address);

  const { data: balance } = useReadContract({
    abi: NFTContractABI,
    address: NFTContractAddress,
    functionName: 'balanceOf',
    args: [address ?? '0x0'],
  });

  const {
    sendTransaction,
    isPending,
    isSuccess,
    error,
    data: txHash,
  } = useSendTransaction();

  const handlePayment = async () => {
    if (!address) {
      toast.warning('Please connect your wallet first');
      return;
    }
    if (userAddress.name.trim() === '') {
      toast.error('Address not selected');
      return;
    }

    sendTransaction({
      to: paymentAddress,
      value: parseEther(`${payTotal}`),
    });
  };

  useEffect(() => {
    const placeOrder = async () => {
      if (isSuccess) {
        toast.success('✅ Payment sent!');
        addToOrderHistory(Items, userAddress);
        dispatch(removePreviousAddress());

        if (deleteCartItems) {
          await Promise.all(Items.map((item) => removeFromCart(item.id)));
          dispatch(updateCartItem(0));
        }

        setTimeout(() => setOpen(true), 2000);
      }
    };

    placeOrder();
  }, [isSuccess]);

  return (
    <div className="payment-gateway">
      <appkit-button />

      {address && (
        <div className="container">
          <div className="nft-section">
            <h2>Your NFTs</h2>
            <p>Balance: {balance?.toString() || '0'}</p>
          </div>

          <div className="payment-section">
            <h2>Send Payment</h2>
            <p>Send {payTotal} ETH to:</p>
            <p className="address">{paymentAddress}</p>

            <button onClick={handlePayment} disabled={isPending}>
              {isPending ? 'Sending...' : `Pay ${payTotal} ETH`}
            </button>

            {txHash && (
              <a
                href={`https://sepolia.basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tx-link"
              >
                View Transaction
              </a>
            )}

            {isSuccess && <p className="success">✅ Payment sent!</p>}
            {error && <p className="error">❌ {error.message}</p>}
          </div>
        </div>
      )}

      {open && (
        <div className="place-order-container">
          <div className="place-order">
            <h2>Order Confirmed</h2>
            <p>Your order has been placed successfully!</p>
            <button
              type="button"
              className="place-order-btn"
              onClick={() => navigate(ROUTES.ORDER)}
            >
              View Order
            </button>
            <br />
            <button
              className="place-order-btn"
              onClick={() => {
                navigate(ROUTES.HOMEPAGE);
                setOpen(false);
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
