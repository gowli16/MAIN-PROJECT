function CartItem(props) {
    return (
        <div className="cartitem">

            <img
                src={props.image}
                alt={props.name}
                className="cartimage"
            />

            <div className="cartdetails">
                <h3>{props.name}</h3>
                <p>{props.pharmacy}</p>
                <p>₹{props.price}</p>
            </div>

            <div className="carttotal">
                ₹{props.price * props.quantity}
            </div>

        </div>
    );
}

export default CartItem;