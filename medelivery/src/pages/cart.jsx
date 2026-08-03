import CartItem from "../components/CartItem";
import medicines from "../backend/medicines.json";
import { Fragment } from "react";

import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();

    const total = medicines.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Fragment>

            <section className="cart">
                {medicines.map((item) => (
                    <CartItem
                        key={item.id}
                        image={item.image}
                        name={item.medicine}
                        pharmacy={item.pharmacy}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ))}

                <div className="total">
                    <h2>Total: ₹{total}</h2>

                    <button
                        className="btn"
                        onClick={() =>
                            navigate("/Checkout", { state: { total } })
                        }
                    >
                        Checkout
                    </button>
                </div>
            </section>
        </Fragment>
    );
}

export default Cart;