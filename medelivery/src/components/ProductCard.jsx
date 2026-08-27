import { useCart } from "../context/useCart";

function ProductCard({ medicine }) {

    const { addToCart } = useCart();

    return (
        <div className="product-card">

            <img
                src={medicine.image}
                alt={medicine.medicine}
            />

            <div className="product-info">

                <h3>{medicine.medicine}</h3>

                <p>{medicine.brand}</p>

                <p>{medicine.category}</p>

                <h4>₹{medicine.price}</h4>

                <p>
                    Stock: {medicine.stock}
                </p>

                <button
                    onClick={() => addToCart(medicine)}
                    disabled={medicine.stock <= 0}
                >
                    {medicine.stock <= 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>

            </div>

        </div>
    );
}

export default ProductCard;