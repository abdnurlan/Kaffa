import React from 'react';
import styles from './Basket.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { CiCircleRemove } from 'react-icons/ci';
import { addToCart, decreaseCart, removeFromCart, changeGrammage } from '../../features/cartSlice';
import { useEffect } from 'react';
import { getTotals } from '../../features/cartSlice';

const grammages = ["0.125kg", "0.500kg", "1kg"];

const BasketDashboard = () => {
  const cart = useSelector((state) => state.cart);
  const { cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleGrammageChange = (cartItem, direction) => {
    const currentGrammageIndex = grammages.indexOf(cartItem.grammage);
    let newGrammageIndex = currentGrammageIndex;

    if (direction === 'up' && currentGrammageIndex < grammages.length - 1) {
      newGrammageIndex += 1;
    } else if (direction === 'down' && currentGrammageIndex > 0) {
      newGrammageIndex -= 1;
    }

    const newGrammage = grammages[newGrammageIndex];
    dispatch(changeGrammage({ id: cartItem.id, grammage: newGrammage }));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const generateWhatsAppMessage = () => {
    const message = cart.cartItems.map(item => `${item.name}: \t${item.cartQuantity} × ${item.grammage} = $${(item.price * item.cartQuantity).toFixed(2)}`).join('%0A%0A');
    const totalPrice = `Total Amount: $${cartTotalAmount.toFixed(2)}`;
    const whatsappLink = `https://wa.me/+994554048181/?text=Order%20Details:%0A%0A${message}%0A%0A${totalPrice}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className='container'>
      <div className={styles.dashboard}>
        {cart.cartItems.length === 0 ? (
          <div>
            <div className={styles.empty_basket}>
              <p>Your cart currently empty</p>
            </div>
            <div className={styles.return_shop}>
              <Link to='/'><button>Return to shop</button></Link>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.table_container}>
              <table className={styles.product_table}>
                <thead>
                  <tr>
                    <th className={styles.gap}></th>
                    <th className={styles.gap}></th>
                    <th className={styles.product_price}>Product</th>
                    <th className={styles.product_name}>Price</th>
                    <th className={styles.product_quantity}>Quantity</th>
                    <th className={styles.product_price}>Grammage</th>
                    <th className={styles.product_price}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems?.map(cartItem => (
                    <tr key={cartItem.id}>
                      <td className={styles.remove} onClick={() => handleRemoveFromCart(cartItem)}><CiCircleRemove /></td>
                      <td className={styles.product_img}><img src={cartItem.img} alt={cartItem.name} /></td>
                      <td className={styles.product_name}>{cartItem.name}</td>
                      <td className={styles.product_price}>${cartItem.price}</td>
                      <td className={styles.product_quantity}>
                        <div className={styles.quantity_container}>
                          <div className={styles.quantity_number}>{cartItem.cartQuantity}</div>
                          <div className={styles.quantity_buttons}>
                            <div onClick={() => handleIncreaseCart(cartItem)}><FaAngleUp /></div>
                            <div onClick={() => handleDecreaseCart(cartItem)}><FaAngleDown /></div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.product_quantity}>
                        <div className={styles.grammage_container}>
                          <div className={styles.quantity_number}>{cartItem.grammage}</div>
                          <div className={styles.quantity_buttons}>
                            <div onClick={() => handleGrammageChange(cartItem, 'up')}><FaAngleUp /></div>
                            <div onClick={() => handleGrammageChange(cartItem, 'down')}><FaAngleDown /></div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.product_subtotal}>${(cartItem.price * cartItem.cartQuantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className={styles.product_total_price}>
                <thead>
                  <tr>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><th>${cartTotalAmount.toFixed(2)}</th></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.non_table_container}>
              {cart.cartItems?.map(cartItem => (
                <div key={cartItem.id} className={styles.cart_item}>
                  <button onClick={() => handleRemoveFromCart(cartItem)} className={styles.remove_button}><CiCircleRemove /></button>
                  <div className={styles.product_info}>
                    <div className={styles.product_info_text}>
                      <p>Product:</p>
                      <p className={styles.product_name}>{cartItem.name}</p>
                    </div>
                    <div className={styles.product_info_text}>
                      <p>Price:</p>
                      <p className={styles.product_price}>${cartItem.price}</p>
                    </div>
                    <div className={styles.product_info_text}>
                      <p>Quantity:</p>
                      <div className={styles.quantity_container}>
                        <div className={styles.quantity_number}>{cartItem.cartQuantity}</div>
                        <div className={styles.quantity_buttons}>
                          <div onClick={() => handleIncreaseCart(cartItem)}><FaAngleUp /></div>
                          <div onClick={() => handleDecreaseCart(cartItem)}><FaAngleDown /></div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.product_info_text}>
                      <p>Grammage:</p>
                      <div className={styles.grammage_container}>
                        <div className={styles.quantity_number}>{cartItem.grammage}</div>
                        <div className={styles.quantity_buttons}>
                          <div onClick={() => handleGrammageChange(cartItem, 'up')}><FaAngleUp /></div>
                          <div onClick={() => handleGrammageChange(cartItem, 'down')}><FaAngleDown /></div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.product_info_text}>
                      <p>Subtotal:</p>
                      <p className={styles.product_subtotal}>${(cartItem.price * cartItem.cartQuantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.total_price}>
                <p>Total Price: ${cartTotalAmount.toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.let_order}>
              <button onClick={generateWhatsAppMessage}>Let Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasketDashboard;
