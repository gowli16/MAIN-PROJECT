import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Pharmacies from "./pages/pharmacies";
import ProductList from "./components/ProductList";
import "./App.css";


function App() {

    return(

        <>
            <Navbar />
            <Hero />
            <SearchBar />
            <pharmacies />
            <ProductList />

        </>

    );

}

export default App;