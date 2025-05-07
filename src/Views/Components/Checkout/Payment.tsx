import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';
import { RootState } from '../../../Store';
import { addToOrderHistory } from '../../../Services/Order/order';
import { removePreviousAddress } from '../../../Store/Address/AddressSlice';
import { ROUTES, TEXT, TOAST } from '../../../Shared/Constants';
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

function Payment({ Items, deleteCartItems, total }: Readonly<ItemProps>) {
  const { isConnected } = useAccount();
  const dispatch = useDispatch();
  const [showOrderConfirmed, setShowOrderConfirmed] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showPaymentWindow, setShowPaymentWindow] = useState<boolean>(false);
  const navigate = useNavigate();
  const addressData = useSelector((state: RootState) => state.address);
  const payTotal: number = Number((0.00001 * Number(total)).toFixed(4));

  const {
    writeContract,
    isPending: isMinting,
    error: mintError,
    data: hash,
  } = useWriteContract();

  const { isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  });

  const handleMint = async () => {
    if (!addressData.name.trim()) {
      toast.error(TOAST.ADDRESS_ERROR);
      return;
    }

    try {
      setShowPaymentWindow(true);
      writeContract({
        abi: NFTContractABI,
        address: NFTContractAddress,
        functionName: 'mintNFT',
        args: [''],
        value: parseEther(`${payTotal}`),
      });
    } catch {
      setShowPaymentWindow(false);
      toast.error(TOAST.PAYMENT_FAIL);
    }
  };

  useEffect(() => {
    if (isTxConfirmed && hash) {
      addToOrderHistory(Items, addressData, payTotal);
      dispatch(removePreviousAddress());
      setTxHash(hash);

      if (deleteCartItems) {
        Promise.all(Items.map((item) => removeFromCart(item.id))).then(() =>
          dispatch(updateCartItem(0))
        );
      }
      setShowPaymentWindow(false);
      setShowOrderConfirmed(true);
    }
  }, [isTxConfirmed]);

  useEffect(() => {
    if (mintError) {
      setShowPaymentWindow(false);
      toast.error(TOAST.PAYMENT_FAIL);
    }
  }, [mintError]);

  useEffect(() => {
    document.body.style.overflow =
      showPaymentWindow || showOrderConfirmed ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPaymentWindow, showOrderConfirmed]);

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
              {isMinting ? 'Processing...' : `Pay ${payTotal} ETH`}
            </button>
          </div>
        )}
      </div>

      {showPaymentWindow && (
        <div className="place-order-container">
          <div className="place-order">
            <h2>{TEXT.PAYMENT_IN_PROGRESS}</h2>
            <p>{TEXT.TX_PROCESSING}</p>
            {hash && (
              <>
                <div className="spinner" />
                <p className="tx-hash">
                {TEXT.TX}: {hash.slice(0, 10)}...{hash.slice(-8)}
                </p>
                <a
                  href={`https://holesky.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  {TEXT.VIEW_ON_ETHERSCAN}
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {showOrderConfirmed && (
        <div className="place-order-container">
          <div className="place-order">
            <h2>{TEXT.ORDER_CONFIRMED}</h2>
            <p>{TEXT.ORDER_RECEIVED}</p>
            <button
              type="button"
              className="place-order-btn"
              onClick={() => {
                navigate(ROUTES.ORDER);
                setShowOrderConfirmed(false);
              }}
            >
              {TEXT.VIEW_ORDER}
            </button>
            <br />
            <button
              className="place-order-btn"
              onClick={() => {
                navigate(ROUTES.HOMEPAGE);
                setShowOrderConfirmed(false);
              }}
            >
              {TEXT.CONTINUE_SHOPPING}
            </button>
            {txHash && (
              <div className="tx-info">
                <p>{TEXT.TX_HASH}:</p>
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
