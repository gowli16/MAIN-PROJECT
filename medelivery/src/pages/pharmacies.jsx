import { Fragment, useEffect, useState } from "react";
import PharmacyCard from "../components/PharmacyCard";

function Pharmacies() {

    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);


    // Get pharmacies from the backend
    useEffect(() => {

        fetch("http://localhost:5000/pharmacies")

            .then((response) => response.json())

            .then((data) => {

                setPharmacies(data);

                setLoading(false);

            })

            .catch((error) => {

                console.error(
                    "Error fetching pharmacies:",
                    error
                );

                setLoading(false);

            });

    }, []);


    // Loading message
    if (loading) {

        return (

            <section className="cardo">

                <h2>Loading pharmacies...</h2>

            </section>

        );

    }


    return (

        <Fragment>

            <section className="cardo">

                {pharmacies.map((item) => (

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