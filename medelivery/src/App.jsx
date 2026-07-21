import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";

import ProductList from "./components/ProductList";
import "./App.css";


function App() {

    return(

        <>
            <Navbar />
            <Hero />
            <SearchBar />

            <ProductList />

        </>

    );

}

export default App;