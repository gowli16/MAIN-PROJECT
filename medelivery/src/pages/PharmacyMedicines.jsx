import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function PharmacyMedicines() {

    const { id } = useParams();

    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadMedicines() {

            try {

                const response = await fetch(
                    `http://localhost:5000/pharmacy/${id}/medicines`
                );

                const data = await response.json();

                if (response.ok) {

                    setMedicines(data);

                } else {

                    console.log(
                        "Error loading medicines:",
                        data
                    );

                }

            } catch (error) {

                console.error(
                    "Error fetching medicines:",
                    error
                );

            }

            setLoading(false);
        }

        loadMedicines();

    }, [id]);

    const filteredMedicines = medicines.filter(
        (medicine) =>
            medicine.medicine
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            medicine.brand
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    if (loading) {

        return (
            <section className="pharmacy-medicine-page">
                <h2>Loading medicines...</h2>
            </section>
        );

    }

    return (

        <section className="pharmacy-medicine-page">

            <h1>Medicines Available</h1>

            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
            />

            {filteredMedicines.length === 0 ? (

                <div className="no-results">

                    <h3>
                        No medicines found
                    </h3>

                    <p>
                        This pharmacy does not have
                        the medicine you searched for.
                    </p>

                </div>

            ) : (

                <div className="products">

                    {filteredMedicines.map(
                        (medicine) => (

                            <ProductCard
                                key={medicine.id}
                                medicine={medicine}
                            />

                        )
                    )}

                </div>

            )}

        </section>

    );
}

export default PharmacyMedicines;