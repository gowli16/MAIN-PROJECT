import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Productlist from "./Productlist";
import { Fragment } from "react";
function Hero(){

    return(
        <Fragment>
        <Navbar />
        <section className="hero">
            <h1>Find the pharmacy thats nearest to YOU!!</h1>
            <p> We provide cheap and effective medicines to your doorstep.</p>
            <button>SHop here</button>
            <SearchBar />
            <Productlist />
        </section>
        </Fragment>

    );

}

export default Hero;