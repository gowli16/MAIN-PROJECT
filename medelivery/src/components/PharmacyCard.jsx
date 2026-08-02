function PharmacyCard(props)
{
    return(
        <div className="pharmacycard">

            <h2>{props.name}</h2>

            <p>Address: {props.address}</p>

            <p>Phone: {props.phone}</p>

        </div>
    );
}

export default PharmacyCard;