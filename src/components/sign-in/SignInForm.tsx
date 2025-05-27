import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:1337/api/auth/local", {
                identifier,
                password,
            });

            // Simpan token JWT ke localStorage
            localStorage.setItem("token", res.data.jwt);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // Arahkan ke halaman dashboard atau home
            window.location.href = "/courses"; // ganti sesuai routing kamu

        } catch (err) {
            console.error(err);
            setErrorMsg("Login gagal. Periksa username/email dan password.");
        }
    };

    return (
        <>
            <section className="sign-in-section section-padding fix">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <div className="sign-in-items">
                                <div className="title text-center">
                                    <h2 className="wow fadeInUp">Sign In to your Account</h2>
                                </div>
                                <form onSubmit={handleLogin} id="contact-form" method="POST">
                                    <div className="row g-4">
                                        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".2s">
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
                                        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".4s">
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

                                        <div className="col-lg-4 wow fadeInUp" data-wow-delay=".4s">
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
        </>
    );
};

export default SignInForm;
