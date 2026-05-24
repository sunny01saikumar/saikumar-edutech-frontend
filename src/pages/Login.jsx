import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Login() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    /*
        LOGIN
    */

    const login = async () => {

        try {

            const response =
                await API.post(
                    "/auth/login",
                    {
                        email,
                        password
                    }
                );

            /*
                STORE JWT
            */

            localStorage.setItem(
                "token",
                response.data.token
            );

            /*
                STORE USER
            */

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );

            /*
                NAVIGATE
            */

            navigate("/feed");

        } catch (error) {

            console.error(error);

            alert("Login Failed");
        }
    };

    return (

        <div className="login-page">

            <div className="login-left">

                <div className="login-overlay">

                    <h1 className="brand-title">

                        Saikumar EduTech

                    </h1>

                    <p className="brand-subtitle">

                        Learn • Build • Grow

                    </p>

                </div>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2 className="login-title">

                        Welcome Back

                    </h2>

                    <p className="login-text">

                        Login to continue

                    </p>

                    {/* EMAIL */}

                    <input

                        className="login-input"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />

                    {/* PASSWORD */}

                    <input

                        className="login-input"

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    {/* LOGIN */}

                    <button

                        className="login-button"

                        onClick={login}
                    >

                        Login

                    </button>

                    <p
    style={{
        marginTop: "20px",
        textAlign: "center",
        color: "#64748b"
    }}
>

    {/* Don't have account?

    <span

        onClick={() =>
            navigate("/register")
        }

        style={{
            color: "#2563eb",
            cursor: "pointer",
            marginLeft: "8px",
            fontWeight: "600"
        }}
    >

        Create User

    </span> */}

</p>

                </div>

            </div>

        </div>
    );
}

export default Login;