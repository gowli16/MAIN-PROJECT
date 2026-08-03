import { Fragment, useState } from "react";
import Navbar from "../components/Navbar";
function Pharmacyside() {

    const [file, setFile] = useState(null);
    function handleChange(e){
        setFile(e.target.files[0]);
    }

    function handleUpload(){
        if(file){
            alert(file.name + " uploaded successfully");
        }
    }

    return(
    <Fragment>
        <Navbar/>
        <section className="pharmacyside">

            <h1>Pharmacy Dashboard</h1>

            <input
                type="file"
                accept=".json"
                onChange={handleChange}
            />
            <br/>
            <button onClick={handleUpload}>
                Upload
            </button>

        </section>
    </Fragment>
    );
}

export default Pharmacyside;