import { useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import medicines from "../backend/medicines.json";

function ProductList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

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