import { useState } from "react";

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
        <section className="pharmacyside">

            <h1>Pharmacy Dashboard</h1>

            <input
                type="file"
                accept=".json"
                onChange={handleChange}
            />

            <button onClick={handleUpload}>
                Upload
            </button>

        </section>
    );
}

export default Pharmacyside;