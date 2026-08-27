
import ProductList from "./Productlist";
import { Fragment } from "react";
function Hero(){
    return(
        <Fragment>
        <section className="hero">
            <h1>Find the pharmacy thats nearest to YOU!!</h1>
            <p> We provide cheap and effective medicines to your doorstep.</p>
            <button>SHop here</button>
            <ProductList />
        </section>
        </Fragment>

    );

}

export default Hero;