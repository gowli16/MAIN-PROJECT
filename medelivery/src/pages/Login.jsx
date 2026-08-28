import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!username || !password) {

            alert("Please enter your username and password.");

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


            if (!response.ok) {

                alert(data.message || "Invalid username or password.");

                return;

            }


            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );


            // Redirect according to user role
            if (data.role === "admin") {

                navigate("/admin");

            }

            else if (data.role === "pharmacy") {

                navigate("/Pharmacyside");

            }

            else {

                navigate("/hero");

            }


        } catch (error) {

            console.error("Login error:", error);

            alert(
                "Unable to connect to the server."
            );

        }

    };


    return (

        <Fragment>

            <section className="loginmain">

                <div className="login">

                    <h1>
                        Welcome back to McDelivery
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

                        <br />


                        <input

                            type="password"

                            placeholder="Password"

                            value={password}

                            onChange={(e) =>
                                setPassword(e.target.value)
                            }

                        />

                        <br />


                        <button type="submit">
                            Login
                        </button>

                        <br />


                        <h3 style={{ color: "grey" }}>
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

            </section>

        </Fragment>

    );

}

export default Login;