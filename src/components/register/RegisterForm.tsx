import { useState } from "react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Password and Confirm Password do not match");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/local/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess("Registration successful!");
                console.log("User:", data.user);
            } else {
                setError(data.error.message);
            }
        } catch (err) {
            setError("Something went wrong.");
        }
    };

    return (
        <section className="sign-in-section section-padding fix">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="sign-in-items">
                            <div className="title text-center">
                                <h2>Create An Account</h2>
                            </div>

                            {error && <p style={{ color: "red" }}>{error}</p>}
                            {success && <p style={{ color: "green" }}>{success}</p>}

                            <form onSubmit={handleSubmit} id="contact-form">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="form-clt style-2">
                                            <span>First Name *</span>
                                            <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-clt">
                                            <span>Last Name *</span>
                                            <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-clt">
                                            <span>Email Address *</span>
                                            <input type="email" name="email" onChange={handleChange} placeholder="Email Address" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-clt">
                                            <span>Username *</span>
                                            <input type="text" name="username" onChange={handleChange} placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-clt">
                                            <span>Create Password *</span>
                                            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-clt">
                                            <span>Confirm Password *</span>
                                            <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <button type="submit" className="theme-btn">
                                            Sign Up
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

export default RegisterForm;
