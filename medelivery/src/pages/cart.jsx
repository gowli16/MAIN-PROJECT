import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

function Cart() {

    const navigate = useNavigate();

    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total
    } = useCart();

    if (cart.length === 0) {

        return (
            <div className="cart-page">

                <h2>Your Cart</h2>

                <p>Your cart is empty.</p>

            </div>
        );
    }

    return (
        <div className="cart-page">

            <h2>Your Cart</h2>

            <div className="cart-items">

                {cart.map((item) => (

                    <div
                        className="cart-item"
                        key={item.id}
                    >

                        <img
                            src={item.image}
                            alt={item.medicine}
                        />

                        <div className="cart-item-info">

                            <h3>
                                {item.medicine}
                            </h3>

                            <p>
                                {item.brand}
                            </p>

                            <p>
                                ₹{item.price}
                            </p>

                            <div className="quantity-controls">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                >
                                    -
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item.id)
                                    }
                                >
                                    +
                                </button>

                            </div>

                            <button
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <div className="cart-summary">

                <h3>
                    Total: ₹{total}
                </h3>

                <button onClick={clearCart}>
                    Clear Cart
                </button>

                <button
                    onClick={() =>
                        navigate("/checkout")
                    }
                >
                    Proceed to Checkout
                </button>

            </div>

        </div>
    );
}

export default Cart;