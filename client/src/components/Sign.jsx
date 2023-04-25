import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import "./Sign.css";

function Sign({handleLogin}) {
    const {position} = useParams() //useParams me devuelve un objeto tal que {position (esto lo sabe porque se lo hemos indicado en las routes del App): valor}, asi que hacemos una desestructurizacion
    const {error} = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');       

    return (
        <div className="logincontainer">
            <div className="loginbox">
                <form >
                    <h2>Sign In</h2>
                    <label>
                        Email
                        <input type="email" name="email" onInput={(e)=>setEmail(e.target.value)} required />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" onInput={(e)=>{setPassword(e.target.value)}} onKeyPress={(e)=> e.charCode === 13 && (handleLogin(email, password, position), setEmail(""), setPassword(""))} required />
                    </label>
                    {error ? <span className="error-msg">{error}</span> : <></>}
                    <br/>
                    <button type="button" onClick={()=>{handleLogin(email, password, position), setEmail(""), setPassword("")}}>Sign In</button>
                    
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
