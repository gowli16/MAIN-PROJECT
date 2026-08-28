import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import SearchBar from "./SearchBar";

function ProductList() {

    const [medicines, setMedicines] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        fetch("http://localhost:5000/medicines")

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch medicines");
                }

                return response.json();

            })

            .then((data) => {

                setMedicines(data);

                setLoading(false);

            })

            .catch((error) => {

                console.error("Error:", error);

                setError("Unable to load medicines.");

                setLoading(false);

            });

    }, []);


    const categories = [

        "All",

        ...new Set(
            medicines.map((medicine) => medicine.category)
        )

    ];


    const filteredMedicines = medicines.filter((medicine) => {

        const matchesSearch =

            medicine.medicine
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            medicine.brand
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


        const matchesCategory =

            selectedCategory === "All" ||

            medicine.category === selectedCategory;


        return matchesSearch && matchesCategory;

    });


    if (loading) {

        return (
            <section className="medicine-section">

                <h2>Popular Medicines</h2>

                <p>Loading medicines...</p>

            </section>
        );

    }


    if (error) {

        return (
            <section className="medicine-section">

                <h2>Popular Medicines</h2>

                <p>{error}</p>

            </section>
        );

    }


    return (

        <section className="medicine-section">

            <h2>Popular Medicines</h2>


            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
            />


            <div className="category-filter">

                {categories.map((category) => (

                    <button

                        key={category}

                        className={
                            selectedCategory === category
                                ? "category-button active"
                                : "category-button"
                        }

                        onClick={() =>
                            setSelectedCategory(category)
                        }

                    >

                        {category}

                    </button>

                ))}

            </div>


            {filteredMedicines.length === 0 ? (

                <div className="no-results">

                    <h3>No medicines found</h3>

                    <p>
                        Try another medicine or category.
                    </p>

                </div>

            ) : (

                <div className="products">

                    {filteredMedicines.map((medicine) => (

                        <ProductCard

                            key={medicine.id}

                            medicine={medicine}

                        />

                    ))}

                </div>

            )}

        </section>

    );

}

export default ProductList;