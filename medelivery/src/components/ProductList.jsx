import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

function ProductList() {

    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);


// retrieves the medicines from the backend

    useEffect(() => {

        async function loadMedicines() {

            try {

                const response = await fetch(
                    "http://localhost:5000/medicines"
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

    }, []);

    const categories = [
        "All",
        ...new Set(
            medicines.map(
                (medicine) => medicine.category
            )
        )
    ];
//filers medicine

    const filteredMedicines = medicines.filter(
        (medicine) => {

            const matchesSearch =
                medicine.medicine
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||

                medicine.brand
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );


            const matchesCategory =
                selectedCategory === "All" ||
                medicine.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        }
    );


    if (loading) {

        return (

            <section className="medicine-section">

                <h2>
                    Loading medicines...
                </h2>

            </section>

        );

    }


    return (

        <section className="medicine-section">

            <h2>
                Popular Medicines
            </h2>


            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
            />


            {/* CATEGORY BUTTONS */}

            <div className="category-filter">

                {categories.map(
                    (category) => (

                        <button
                            key={category}

                            className={
                                selectedCategory === category
                                    ? "category-button active"
                                    : "category-button"
                            }

                            onClick={() =>
                                setSelectedCategory(
                                    category
                                )
                            }
                        >

                            {category}

                        </button>

                    )
                )}

            </div>


            {/* MEDICINES */}

            {filteredMedicines.length === 0 ? (

                <div className="no-results">

                    <h3>
                        No medicines found
                    </h3>

                    <p>
                        Try another medicine
                        or category.
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

export default ProductList;