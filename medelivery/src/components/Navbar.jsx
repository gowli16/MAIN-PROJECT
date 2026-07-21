import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav>

            <div className="logo">
                <h2>Random Ahh</h2>
            </div>

            <div className="navbaritems">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pharmacies">Pharmacies</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </div>

        </nav>
    );
}

export default Navbar;