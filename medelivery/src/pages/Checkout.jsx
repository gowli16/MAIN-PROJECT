import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

function Checkout() {

    const { cart, total, clearCart } = useCart();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handlePlaceOrder = (e) => {

        e.preventDefault();

        if (!name || !phone) {
            alert("Please fill in your name and phone number.");
            return;
        }

        alert("Order placed successfully!");

        clearCart();

        navigate("/hero");
    };

    if (cart.length === 0) {

        return (
            <section className="checkout">

                <h1>Checkout Page</h1>

                <h2>Your cart is empty.</h2>

            </section>
        );
    }

    return (
        <section className="checkout">

            <h1>Checkout Page</h1>

            <h2>Customer Details</h2>

            <form onSubmit={handlePlaceOrder}>

                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label>Phone Number</label>

                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </div>

                <h2>
                    Your total is: ₹{total}
                </h2>

                <h2>
                    Scan this QR to process payment
                </h2>

                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGPgPDE3SHpzJz0WBA5uM-VwTAE4vl7NqrXVc2yb0aVw&s=10"
                    alt="Payment QR"
                    className="cimg"
                />

                <button type="submit">
                    Place Order
                </button>

            </form>

        </section>
    );
}

export default Checkout;