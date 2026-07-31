import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cart from "./pages/Cart";
import Pharmacies from "./pages/pharmacies";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pharmacies" element={<Pharmacies />} />
            </Routes>
        </BrowserRouter>        
    );
}

export default App;