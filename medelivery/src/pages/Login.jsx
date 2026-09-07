import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import pharmacyImage from "../assets/pharmacy1.png";
function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        if (!username || !password) {
            alert("Please enter username and password.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data)
                );

                if (data.username === "admin") {

                    navigate("/admin");

                } else if (data.username === "pharmacy") {

                    navigate("/Pharmacyside");

                } else {

                    navigate("/hero");

                }

            } else {

                alert(
                    data.message ||
                    "Invalid username or password"
                );

            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            alert(
                "Unable to connect to the server."
            );

        }
    }

    return (
        <Fragment>
            <section className="loginmain">
                <div className="login">
                    <h1>
                        Welcome back to
                        <br />
                        McMedicine
                    </h1>

                    <h2>
                        Login to your existing account :)
                    </h2>

                    <form onSubmit={handleLogin}>

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button type="submit">
                            Login
                        </button>

                        <h3>
                            Dont have an account? SIGN up below
                        </h3>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/signup")
                            }
                        >
                            Sign Up
                        </button>

                    </form>

                </div>
                <div className="login-image-container">

                    <img
                        className="loginimg"
                        src={pharmacyImage}
                        alt="Pharmacy medicine"
                    />

                </div>

            </section>

        </Fragment>
    );
}

export default Login;