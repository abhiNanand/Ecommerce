

import { useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutForm from '../Checkout/CheckoutForm';
import { Product } from '../../../Shared/Product';
import Payment from '../Checkout/Payment';

interface ItemProps {
    products: Product[];
}

export default function BuyProduct({ products }: Readonly<ItemProps>) {
    const [coupean, setCoupean] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);
    const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);

    const calculateTotal = (): number => {
        return products.reduce(
            (total, product) => total + product.price * (product.quantity ?? 1),
            0
        );
    };

    const handleButtonClick = () => {
        if (coupean == 'SAVE20') {
            if (isCouponApplied) {
                toast.error('Coupon already applied on this purchase');
            } else {
                toast.success('Congrats 20% OFF');
                const discountAmount = (0.2 * calculateTotal()).toFixed(2);
                setDiscount(Number(discountAmount));
                setIsCouponApplied(true);
            }
        } else {
            const trimCoupon = coupean.trim();
            if (trimCoupon.length == 0) toast.error('Coupon not found');
            else toast.error('Enter a valid coupon');
        }
        setCoupean('');
    };
    return (
        <div className="checkout-container">
            <div className="billing">
                <h1>Billing Details</h1>
                <CheckoutForm />
                <div />
            </div>
            <div className="checkout-cart-items">
                <div className="show-cart-item">
                    {products.map((item) => (
                        <div key={item.id} className="checkout-cart-item">
                            <div>
                                <img
                                    src={item.image}
                                    alt="productimage"
                                    height="30px"
                                    width="30px"
                                />
                                <p
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '30vw',
                                    }}
                                >
                                    {item.title}
                                </p>
                            </div>

                            <p>${item.price * (item?.quantity ?? 1)}</p>
                        </div>
                    ))}
                </div>
                <div className="checkout-subtotal">
                    <p>Subtotal:</p>
                    <p> ${calculateTotal().toFixed(2)}</p>
                </div>
                <hr />
                {isCouponApplied && (
                    <>
                        <div className="applied-coupon">
                            <p>
                                Coupon:{' '}
                                <button type="button" className="remove-btn">
                                    SAVE20
                                </button>
                            </p>
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => {
                                    setIsCouponApplied(false);
                                    setDiscount(1);
                                }}
                            >
                                -${discount} [Remove]
                            </button>
                        </div>
                        <hr />
                    </>
                )}
                <div className="checkout-shipping">
                    <p>Shipping:</p>
                    <span>Free</span>
                </div>
                <hr />
                <div className="checkout-total">
                    <p>Total:</p>
                    <p>${(calculateTotal() - discount).toFixed(2)}</p>
                </div>
                <hr />
                <div className="ETH">
                    <p>ETH:</p>
                    <p>{((calculateTotal() - discount) * 0.00001).toFixed(4)}</p>
                </div>
                <hr />
                <div className="checkout-payment">
                    <div className="coupon-section">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            onChange={(e) => setCoupean(e.target.value)}
                            value={coupean}
                            onKeyDown={(e) => e.key === 'Enter' && handleButtonClick()}
                        />
                        <button type="button" onClick={() => handleButtonClick()}>
                            Apply Coupon
                        </button>
                    </div>
                    <Payment
                        Items={products}
                        deleteCartItems
                        total={(calculateTotal() - discount).toFixed(2)}
                    />
                </div>
            </div>
        </div>
    );
}