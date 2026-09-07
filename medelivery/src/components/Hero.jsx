import ProductList from "./Productlist";
import { Fragment } from "react";

function Hero() {

    return (
        <Fragment>
            <section className="hero">
                <h1>
                    Find the pharmacy thats nearest to YOU!!
                </h1>
                <p>
                    We provide cheap and near location of medicines to you.
                </p>
                <ProductList /> {/* imported product list component to display the list of products */}
            </section>

        </Fragment>
    );
}

export default Hero;