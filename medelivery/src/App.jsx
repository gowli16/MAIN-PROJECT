import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cart from "./pages/Cart";
import Pharmacies from "./pages/pharmacies";
import Login from "./pages/Login";
import Admin from "./pages/admin";
import Signup from "./pages/Signup";
import PharmacySide from "./pages/PharmacySide";
import Checkout from "./pages/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/hero" element={<Hero />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/Pharmacyside" element={<PharmacySide />} />
                <Route path="/pharmacies" element={<Pharmacies />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>        
    );
}

export default App;