import CartItem from "../components/CartItem";
import medicines from "../backend/medicines.json";
import { Fragment } from "react";
import Navbar from "../components/Navbar";
function Cart() {
    return (
        <Fragment>
        <Navbar/>
        <section className="cart">
            {medicines.map((item) => (
                <CartItem
                    image={item.image}
                    name={item.medicine}
                    pharmacy={item.pharmacy}
                    price={item.price}
                    quantity={item.quantity}
                />
            ))}
        
        </section>
        </Fragment>
    );
}

export default Cart;
