import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product.id} className="cart-item">
              <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.model} />
              <h2>{product.model}</h2>
              <p>Country: {product.country}</p>
              <p>Year: {product.year_of_release}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
