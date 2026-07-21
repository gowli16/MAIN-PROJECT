import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

import Cart from "./pages/cart";
import Pharmacies from "./pages/pharmacies";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function Home() {
    return (
        <>
            <Hero />
            <SearchBar />
            <ProductList />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pharmacies" element={<Pharmacies />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;