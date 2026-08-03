import { useState } from "react";
import Navbar from "../components/Navbar";
//import Fragment from "react";
function Admin(){

    const [approved,setApproved]=useState(false);

    return(
        <>
        <Navbar/>
        <section className="adminMain">
            <h1>Admin Dashboard</h1>
            <h2>Pending Upload</h2>
            <button onClick={()=>setApproved(true)}>
                Approve</button>

            {approved &&
                <p>JSON file approved.</p>
            }

        </section>
        </>

    );

}

export default Admin;