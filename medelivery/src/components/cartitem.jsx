function CartItem(props) {
    return (
        <div className="cart-item">

            <img
                src={props.image}
                alt={props.name}
                className="cart-image"
            />

            <div className="cart-details">
                <h3>{props.name}</h3>
                <p>{props.pharmacy}</p>
                <p>₹{props.price}</p>
            </div>

            <div className="cart-quantity">
                <button>-</button>
                <span>{props.quantity}</span>
                <button>+</button>
            </div>

            <div className="cart-total">
                ₹{props.price * props.quantity}
            </div>

        </div>
    );
}

export default CartItem;