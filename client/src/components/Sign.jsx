import React, { useState } from "react";
import "./Sign.css";

function Sign() {

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle sign in form submission
    };

    return (
        <div className="logincontainer">
            <div className="loginbox">
                <form onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    <label>
                        Email
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                    <br/>
                    <button type="submit">Sign In</button>
                    <br/>
                    <p className="sign">
                        Don't have an account?{" "}
                        <a href="./Register">
                            Sign Up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Sign;
