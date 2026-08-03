import { useLocation } from "react-router-dom";
function Checkout()
{
    const location = useLocation();
    const total = location.state?.total || 0;
    return(
        <section className="checkout">
            <h1>Checkout Page</h1>
            <h2>Scan this QR to process payment</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGPgPDE3SHpzJz0WBA5uM-VwTAE4vl7NqrXVc2yb0aVw&s=10" alt="Checkout" className="cimg"/>
            <h2><b>Your total is </b> :₹{total}</h2>
        </section>
    );
}

export default Checkout;