import ProductCard from "./ProductCard";

const medicines = [
    {
        id: 1,
        name: "Paracetamol",
        price: 30,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu5R_0ETDF1DXX0qlz2RPx4P1IdYdEz2L6xpzkoaJE1xNQ7ZZ83a7-26P&s=10"
    },
    {
        id: 2,
        name: "Vitamin C",
        price: 180,
        image: "https://nutrija.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/r/front-2.jpg"
    },
    {
        id: 3,
        name: "Cough Syrup",
        price: 120,
        image: "https://images.apollo247.in/pub/media/catalog/product/A/L/ALK0009_1_1.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%20400w"
    },
    {
        id: 4,
        name: "Pain Relief Gel",
        price: 95,
        image: "https://cdn01.pharmeasy.in/dam/products_otc/I00392/volini-pain-relief-gel-tube-of-100-g-6.1-1712725504.jpg"
    },
    {
        id:5,
        name: "Antibiotic Ointment",
        price: 150,
        image: "https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/c2a7dfcf88b44212afe2acf32534de57.jpg"
    },
    {
        id:6,
        name: "Allergy Relief Tablets",
        price: 200,
        image: "https://5.imimg.com/data5/SELLER/Default/2024/4/409147999/MZ/RF/BR/217973344/allergy-relief-tablets.jpg"
    }

];

function ProductList() {
    return (
        <section>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                Popular Medicines
            </h2>

            <div className="products">
                {medicines.map((medicine) => (
                    <ProductCard
                        key={medicine.id}
                        name={medicine.name}
                        price={medicine.price}
                        image={medicine.image}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductList;