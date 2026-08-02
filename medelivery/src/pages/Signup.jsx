import {Fragment} from "react";
import Navbar from "../components/Navbar";
function Signup() {
  return (
    <Fragment>
    <Navbar/>
      <div className="login">
            <h1 style={{ color: 'grey' }}>Welcome back to McDelivery</h1>
            <h2 style={{ color: 'grey' }}>Login to your existing account :)</h2>
            <form>
                <input type="text" placeholder="  Username" />
                <br/>
                <input type="password" placeholder="   Password" />
                <br/>
                <button type="submit">Login</button>
                <br/>
                <h3 style={{ color: 'grey' }}>Already have an account? login below</h3>
                <button type="submit">Login</button>
            </form>
      </div>
    </Fragment>
  );
}

export default Signup;