import {Fragment} from "react";
import Navbar from "../components/Navbar";
function Signup() {
  return (
    <Fragment>
    <Navbar/>
    <section className="loginmain">
      <div className="login">
            <h1 >Welcome to McDelivery</h1>
            <h2 >Create a new account:)</h2>
            <form>
                <input type="text" placeholder="  Username" />
                <br/>
                <input type="password" placeholder="   Password" />
                <br/>
                <button type="submit">Sign Up </button>
                <br/>
                <h3 style={{ color: 'grey' }}>Already have an account? login below</h3>
                <button type="submit">Login</button>
            </form>
      </div>
      </section>
    </Fragment>
  );
}

export default Signup;