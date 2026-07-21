import CartItem from "../components/cartitem";

function Cart(){
    return(
        <section className="cart">
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
        </section>
    );
}

export default Cart;
