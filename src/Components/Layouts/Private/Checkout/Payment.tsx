import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { RootState } from '../../../../Store';
import { addToOrderHistory } from '../../../../Services/Order/order';
import { removePreviousAddress } from '../../../../Store/Address/AddressSlice';
import { ROUTES } from '../../../../Shared/Constants';
import { removeFromCart } from '../../../../Services/Cart/CartService';

import './Payment.scss';
import { Product } from '../../../../Shared/Product';
import { updateCartItem } from '../../../../Store/Item/total_item_slice';

interface ItemProps {
  Items: Product[];
  deleteCartItems:boolean;
  total:string;
}

function Payment({ Items,deleteCartItems,total }: ItemProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<
    'success' | 'failure' | null
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const address = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payTotal=(0.0001*Number(total)).toFixed(4);

  const connectWallet = async (): Promise<void> => {
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        await provider.send('wallet_requestPermissions', [{ eth_accounts: {} }]);

        const accounts: string[] = await provider.send(
          'eth_requestAccounts',
          []
        );
        console.log("hi->",accounts);
        console.log("ki",accounts[0]);
        setAccount(accounts[0]);
      } catch (err) {
        toast.error('Failed to connect wallet:');
      }
    } else {
      toast.error('MetaMask not found! Please install it first.');
    }
  };

  const sendPayment = async (): Promise<void> => {
    if (!account) {
      toast.warning('Please connect your wallet first');
      return;
    }
    if (address.name.trim() == '') {
      toast.error('address not selected');
      return;
    }
    setIsProcessing(true);
    setPaymentStatus(null);
    setTransactionHash('');

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const receiverAddress = '0x1D7e62a808fC888764cfB26D3FD58A0A81DC4886';
      const amount = ethers.parseEther(`${payTotal}`);

      const balance = await provider.getBalance(account);
      if (balance < amount) {
        throw new Error(`Insufficient funds for ${payTotal} ETH + gas`);
      }

      const transaction = await signer.sendTransaction({
        to: receiverAddress,
        value: amount,
      });

      setTransactionHash(transaction.hash);
      setPaymentStatus('success');
      addToOrderHistory(Items, address);
      dispatch(removePreviousAddress());

      if(deleteCartItems)
      {
        await Promise.all(
          Items.map(async(item)=>{
          await removeFromCart(item.id);
          })
        );
        dispatch(updateCartItem(0));
      }

      setTimeout(() => setOpen(true), 2000);
  
    } catch (err) {
      console.error('Transaction failed:', err);
      setPaymentStatus('failure');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    toast.info('Wallet disconnected');
  };
  
  return (
    <div className="payment-gateway">
      {account&&(<p>account={account}</p>)}
      <button
  className={`connect-button ${account ? 'connected' : ''}`}
  onClick={account ? handleDisconnect : connectWallet}
>

  {account
    ?  `Disconnect`
    : 'Connect Wallet'}
</button>

      {account && (
        <button
          className={`send-button ${isProcessing ? 'processing' : ''}`}
          onClick={sendPayment}
          disabled={isProcessing}
        >
          {isProcessing ? <p> Processing...</p> : <p>Pay {payTotal}ETH</p>}
        </button>
      )}

      {transactionHash && (
        <div className="transaction-info">
          <a
            href={`https://holesky.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tx-link"
          >
            View Transaction on Etherscan
          </a>
        </div>
      )}

      {paymentStatus && (
        <div className={`status-message ${paymentStatus}`}>
          {paymentStatus === 'success'
            ? '✅ Payment successfully sent!'
            : '❌ Payment failed. Please try again.'}
        </div>
      )}

      {open && (
        <div className="place-order-container">
          <div className="place-order">
            <h2>Order Confirmed</h2>
            <p>Your order will be placed successfully!</p>
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

export default Payment;
