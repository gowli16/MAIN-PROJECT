import { useEffect, useState } from "react";

function PharmacySide() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [medicines, setMedicines] = useState([]);

    async function getMedicines() {
        try {
            const response = await fetch(
                "http://localhost:5000/pharmacy/1/medicines"
            );

            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            console.error("Error loading medicines:", error);
        }
    }

    useEffect(() => {
        getMedicines();
    }, []);

    async function handleUpload() {
        if (!file) {
            setMessage("Please select a JSON file.");
            return;
        }

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            const response = await fetch(
                "http://localhost:5000/upload-medicines",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        pharmacy_id: 1,
                        medicines: data
                    })
                }
            );

            const result = await response.json();

            if (response.ok) {
                setMessage("Medicines uploaded successfully.");
                setFile(null);
                document.getElementById("medicine-file").value = "";
                getMedicines();
            } else {
                setMessage(result.message || "Upload failed.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Invalid JSON file or server error.");
        }
    }

    return (
        <div className="pharmacyside">
            <div className="pharmacy-upload">
                <h1>Pharmacy Dashboard</h1>

                <h2>Upload Medicines</h2>

                <input
                    id="medicine-file"
                    type="file"
                    accept=".json"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button className="btn" onClick={handleUpload}>
                    Upload Medicines
                </button>

                {message && <p className="upload-message">{message}</p>}
            </div>

            <div className="pharmacy-medicines">
                <h2>My Medicines</h2>

                <div className="medicine-list">
                    {medicines.length === 0 ? (
                        <p>No medicines available.</p>
                    ) : (
                        medicines.map((medicine) => (
                            <div className="pharmacy-medicine" key={medicine.id}>
                                <img
                                    src={medicine.image}
                                    alt={medicine.medicine}
                                />

                                <div className="pharmacy-medicine-info">
                                    <h3>{medicine.medicine}</h3>
                                    <p>{medicine.brand}</p>
                                    <span>{medicine.category}</span>
                                </div>

                                <div className="pharmacy-medicine-price">
                                    <h3>₹{medicine.price}</h3>
                                    <p>Stock: {medicine.stock}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default PharmacySide;