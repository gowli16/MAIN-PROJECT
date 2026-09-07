import { useNavigate } from "react-router-dom";

function PharmacyCard(props) {
    const navigate = useNavigate(); // allows navigation to different pages in the application
    //when the pharmacy card is clicked, navigate to the pharmacy medicine page with the pharmacy id in the URL
    function openPharmacy() {
        navigate(`/pharmacy/${props.id}`);

    }
    //When Get Directions is clicked, take the pharmacy's address, turn it into a URL-safe format, create a Google Maps directions link, and open it in a new tab. Don't also open the pharmacy medicine page
    function openMaps(event) {
        event.stopPropagation();
        const address = encodeURIComponent(props.address);
        const mapsUrl =
            "https://www.google.com/maps/dir/?api=1&destination="
            + address;

        window.open(mapsUrl, "_blank");

    }

    return (
        <div
            className="pharmacycard"
            onClick={openPharmacy}
        >
            <h2>{props.name}</h2>
            <p>
                Address: {props.address}
            </p>
            <p>
                Phone: {props.phone}
            </p>
            <button onClick={openMaps}>
                Get Directions
            </button>
        </div>
    );
}

export default PharmacyCard;