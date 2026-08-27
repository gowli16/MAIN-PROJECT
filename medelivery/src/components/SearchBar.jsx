import { useState } from "react";

function SearchBar() {

    const [search, setSearch] = useState("");
    const [medicines, setMedicines] = useState([]);

    async function searchMedicine(value) {

        setSearch(value);

        const response = await fetch(
            `http://localhost:5000/medicines?search=${value}`
        );

        const data = await response.json();

        setMedicines(data);
    }

    return (
        <section>

            <input
                type="text"
                placeholder="Search Medicines"
                value={search}
                onChange={(e) => searchMedicine(e.target.value)}
            />

            <div className="searchResults">

                {medicines.length === 0 && search !== "" && (
                    <p>No medicines found.</p>
                )}

                {medicines.map((item) => (
                    <div className="product" key={item.id}>
                        <img src={item.image} alt={item.medicine} />
                        <h3>{item.medicine}</h3>
                        <p>Brand: {item.brand}</p>
                        <p>Category: {item.category}</p>
                        <p>Price: ₹{item.price}</p>
                        <p>Stock: {item.stock}</p>
                        <p>Pharmacy: {item.pharmacy}</p>
                        <p>Location: {item.location}</p>
                        <p>Phone: {item.phone}</p>
                    </div>
                ))}

            </div>

        </section>
    );
}

export default SearchBar;