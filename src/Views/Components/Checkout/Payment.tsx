import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { RootState } from '../../../Store';
import { addToOrderHistory } from '../../../Services/Order/order';
import { removePreviousAddress } from '../../../Store/Address/AddressSlice';
import { ROUTES } from '../../../Shared/Constants';
import { removeFromCart } from '../../../Services/Cart/CartService';
import { updateCartItem } from '../../../Store/Item/total_item_slice';
import { Product } from '../../../Shared/Product';
import NFTContractABI from './NFTContract.json';
import './Payment.scss';

const NFTContractAddress = '0xE32383aB1dbea75Fa416CB7cA200b0e1c89735AC';

interface ItemProps {
  Items: Product[];
  deleteCartItems: boolean;
  total: string;
}

function Payment({ Items, deleteCartItems, total }: ItemProps) {
  const { isConnected } = useAccount();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const addressData = useSelector((state: RootState) => state.address);
  const [txHash, setTxHash] = useState<string | null>(null);

  const payTotal:number = Number((0.00001 * Number(total)).toFixed(4));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
  

  const {
    writeContract,
    isPending: isMinting,
    isSuccess: isMintSuccess,
    error: mintError,
    data: mintData,
  } = useWriteContract();

  const handleMint = () => {
    if (!addressData.name.trim()) {
      toast.error('Address not selected');
      return;
    }

    writeContract({
      abi: NFTContractABI,
      address: NFTContractAddress,
      functionName: 'mintNFT',
      args: [''],
      value: parseEther(`${payTotal}`),
    });
  };
  useEffect(() => {
    if (isMintSuccess) {
      toast.success('Payment Done!');
    addToOrderHistory(Items, addressData,payTotal);
      dispatch(removePreviousAddress());
      setTxHash(mintData);
      if (deleteCartItems) {
        Promise.all(Items.map(async (item) => removeFromCart(item.id))).then(
          () => dispatch(updateCartItem(0))
        );
      }

      setTimeout(() => {
        setOpen(true);
      }, 2000);
    }
  }, [isMintSuccess]);

  useEffect(() => {
    if (mintError) {
      toast.error(`Payment failed`);
    }
  }, [mintError]);

  return (
    <div className="payment-gateway">
      <div className="appkit-btn">
        <appkit-button />
        {isConnected && (
          <div>
            <button
              className={`send-button ${isMinting ? 'processing' : ''}`}
              onClick={handleMint}
              disabled={isMinting}
            >
              {isMinting ? <p>Processing...</p> : <p>Pay {payTotal} ETH </p>}
            </button>
          </div>
        )}
      </div>
      {open && (
        <div className="place-order-container">
          <div className="place-order">
            <h2>Order Confirmed</h2>
            <p>Your order has been received and will be processed shortly.</p>
            <button
              type="button"
              className="place-order-btn"
              onClick={() => {
                navigate(ROUTES.ORDER);
                setOpen(false);
              }}
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
            {txHash && (
              <div className="tx-info">
                <p>Transaction Hash:</p>
                <a
                  href={`https://holesky.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  {txHash.slice(0, 10)}...{txHash.slice(-8)}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Payment;
