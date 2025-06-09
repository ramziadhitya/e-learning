import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignInForm = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(identifier, password);
        if (!result.success) {
            setErrorMsg(result.message || "Login gagal.");
        }
    };

    return (
        <section className="sign-in-section section-padding fix">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="sign-in-items">
                            <div className="title text-center">
                                <h2 className="wow fadeInUp">Sign In to your Account</h2>
                            </div>
                            <form onSubmit={handleLogin} id="contact-form">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="form-clt style-2">
                                            <span>Username or Email *</span>
                                            <input
                                                type="text"
                                                placeholder="Username or Email"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-clt">
                                            <span>Password *</span>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className="icon">
                                                <i className="far fa-eye-slash"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {errorMsg && (
                                        <div className="col-lg-12">
                                            <p style={{ color: "red" }}>{errorMsg}</p>
                                        </div>
                                    )}

                                    <div className="col-lg-4">
                                        <button type="submit" className="theme-btn">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignInForm;
