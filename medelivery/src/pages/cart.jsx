import CartItem from "../components/CartItem";
import medicines from "../backend/medicines.json";
function Cart() {
    return (
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
    );
}

export default Cart;
