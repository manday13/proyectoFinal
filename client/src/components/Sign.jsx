import React, { useState } from "react";
import "./Sign.css";

function Sign() {
    const [signIn, setSignIn] = useState(true);
    const [isClient, setIsClient] = useState(false);

    const toggleForm = () => {
        setSignIn(!signIn);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle sign in form submission
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        // handle sign up form submission
    };

    const handleClientCheckboxChange = (e) => {
        setIsClient(e.target.checked);
    };

    return (
        <div>
            {signIn ? (
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
                    <button type="submit">Sign In</button>
                    <p className="sign">
                        Don't have an account?{" "}
                        <button type="button" onClick={toggleForm}>
                            Sign Up
                        </button>
                    </p>
                </form>
            ) : (
                <form onSubmit={handleSignUpSubmit}>
                    <h2>Sign Up</h2>
                    <label>
                        Email
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                    <label>
                        Validate Password
                        <input type="password" name="validatePassword" required />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="isClient"
                            checked={isClient}
                            onChange={handleClientCheckboxChange}
                        />
                        Are you a client?
                    </label>
                    {!isClient && (
                        <label>
                            Choose one of the following:
                            <select name="choice" required>
                                <option value=""></option>
                                <option value="option1">Tutor</option>
                                <option value="option2">Artist</option>
                                <option value="option3">Therapist</option>
                            </select>
                        </label>
                    )}
                    <button type="submit">Sign Up</button>
                    <p className="sign">
                        Already have an account?{" "}
                        <button type="button" onClick={toggleForm}>
                            Sign In
                        </button>
                    </p>
                </form>
            )}
        </div>
    );
}

export default Sign;
