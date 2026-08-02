import Navbar from "../components/Navbar";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login()
{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function handleLogin(e){
        e.preventDefault();
        const users = [
        {
            username: "admin",
            password: "admin123",
            page: "/admin"
        },
        {
            username: "gowli",
            password: "1234",
            page: "/hero"
        }
        ];
        const user = users.find(
            (u) =>
                u.username === username &&
                u.password === password
             );

        if(user)
        {
        navigate(user.page);
        }
        else
        {
        alert("Invalid Username or Password");
        }
}
    return(
        <Fragment>
        <Navbar/>

        <section className="loginmain">
            <div className="login">
            <h1>Welcome back to McDelivery</h1>
            <h2>Login to your existing account :)</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="  Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <input 
                    type="password" 
                    placeholder="   Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Login</button>
                <br/>
                <h3 style={{ color: 'grey' }}>Dont have an account? SIGN up below</h3>
                <button type="submit">Sign Up</button>
            </form>
            </div> 
            {/* <div className="logindiv">
                <img src="https://img.magnific.com/free-photo/frame-medical-equipment-desk_23-2148519742.jpg?semt=ais_hybrid&w=740&q=80" className="loginimg"/>
            </div>                 */}
        </section>
        </Fragment>
    );
}

export default Login;