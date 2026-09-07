function PharmacyCard(props)
{
    function openMaps()
    {
        const address = encodeURIComponent(props.address);

        const mapsUrl =
            "https://www.google.com/maps/dir/?api=1&destination="
            + address;

        window.open(mapsUrl, "_blank");
    }

    return(
        <div className="pharmacycard">

            <h2>{props.name}</h2>

            <p>Address: {props.address}</p>

            <p>Phone: {props.phone}</p>

            <button onClick={openMaps}>
                Get Directions
            </button>

        </div>
    );
}

export default PharmacyCard;