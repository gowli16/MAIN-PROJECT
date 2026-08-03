import PharmacyCard from "../components/PharmacyCard";
import pharmacy from "../backend/pharmacy.json";
import { Fragment } from "react";
import Navbar from "../components/Navbar";

function Pharmacies() {
    return (
        <Fragment>
        <Navbar/>
        <section className="cardo">
            {pharmacy.map((item) => (
                <PharmacyCard
                    key={item.id}
                    name={item.name}
                    address={item.address}
                    phone={item.phone}
/>
            ))}
        </section>
        </Fragment>
    );
}

export default Pharmacies;