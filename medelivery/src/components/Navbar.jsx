import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Navbar() {

    const { cartCount } = useCart();

    return (

        <nav>

            <div className="logo">
                <h2>McMedicine</h2>
            </div>

            <div className="navbaritems">

                <ul>

                    <li>
                        <Link to="/hero">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/pharmacies">
                            Pharmacies
                        </Link>
                    </li>

                    <li>
                        <Link to="/cart">
                            Cart ({cartCount})
                        </Link>
                    </li>

                </ul>

            </div>

        </nav>

    );
}

export default Navbar;