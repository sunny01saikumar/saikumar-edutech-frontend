import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const register = async () => {

        try {

            await API.post(
                "/auth/register",
                {
                    username,
                    email,
                    password
                }
            );

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Registration Failed");
        }
    };

    return (

        <div className="register-page">

            {/* LEFT SIDE */}

            <div className="register-left">

                <div>

                    <h1 className="brand-title">
                        Saikumar EduTech
                    </h1>

                    <p className="brand-subtitle">
                        Learn • Build • Grow
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="register-right">

                <div className="register-card">

                    <h1 className="register-heading">
                        Create Account
                    </h1>

                    <p className="register-text">
                        Register to continue
                    </p>

                    {/* USERNAME */}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="register-input"
                    />

                    {/* EMAIL */}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="register-input"
                    />

                    {/* PASSWORD */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="register-input"
                    />

                    {/* BUTTON */}

                    <button
                        onClick={register}
                        className="register-button"
                    >

                        Register

                    </button>

                    {/* LOGIN */}

                    <p className="login-link-text">

                        Already have account?

                        <span
                            onClick={() =>
                                navigate("/")
                            }
                            className="login-link"
                        >

                            Login

                        </span>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;