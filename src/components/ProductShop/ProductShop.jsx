import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductShop.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { API_data } from "../../data/data.jsx";

const ProductShop = () => {
  const [displayCount, setDisplayCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [data, setData] = useState([]);
  const [cartButtons, setCartButtons] = useState(
    Array(data.length).fill(false)
  );
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await API_data();
        setData(fetchedData);
      } catch (error) {
        setError(error);
      }
    };
    getData();
  }, []);

  const handleAddToCart = (product, index) => {
    dispatch(addToCart(product));
    const newCartButtons = [...cartButtons];
    newCartButtons[index] = true;
    setCartButtons(newCartButtons);
    setCartOpen(true);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const starFilled = "★";
    const starEmpty = "☆";

    return (
      <div className={styles.stars}>
        {[...Array(totalStars)].map((_, index) => (
          <span
            key={index}
            role="img"
            aria-label={index < filledStars ? "filled-star" : "empty-star"}
          >
            {index < filledStars ? starFilled : starEmpty}
          </span>
        ))}
      </div>
    );
  };

  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prevCount) => prevCount + 4);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className={styles.shop_container}>
        <div className={styles.products_list}>
          {data.slice(0, displayCount).map((product, index) => (
            <div key={product.id} className={styles.product}>
              <div className={styles.product_img_container}>
                <img src={product.img} alt={product.name} />
                <div className={styles.product_shadow}></div>
                {cartButtons[index] ? (
                  <Link to="/basket" className={styles.hover_btn}>
                    Səbətə bax
                  </Link>
                ) : (
                  <div
                    className={styles.hover_btn}
                    onClick={() => handleAddToCart(product, index)}
                  >
                    Səbətə əlavə et
                  </div>
                )}
              </div>
              <div className={styles.product_info}>
                {renderStars(product.star)}
                <h3>{product.name}</h3>
                <div className={styles.product_prices}>
                  {product.discount_price ? (
                    <>
                      <div
                        className={`${styles.original_price} ${
                          product.discount_price
                            ? ""
                            : styles.original_price_green
                        }`}
                      >
                        <span>{`${product.price}`}</span>
                      </div>
                      <div className={styles.discount_price}>
                        <span>{`$${product.discount_price}`}</span>
                      </div>
                    </>
                  ) : (
                    <div className={styles.original_price_green}>
                      <span>{`${product.prices["0.500kg"]} ₼`}</span>
                    </div>
                  )}
                </div>
                {cartButtons[index] ? (
                  <Link to="/basket" className={styles.hover_btn_mobile}>
                    Səbətə bax
                  </Link>
                ) : (
                  <div
                    className={styles.hover_btn_mobile}
                    onClick={() => handleAddToCart(product, index)}
                  >
                    Səbətə əlavə et
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {data.length > displayCount && (
          <div className={styles.button} onClick={handleShowMore}>
            {isLoading ? "Yüklənir..." : "Daha çox göstər"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShop;
