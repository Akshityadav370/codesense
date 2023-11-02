import React, { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { ReactComponent as HeroLogo } from "../images/undraw_code_typing_re_p8b9.svg";
import "../styles/Register.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";


export default function Login() {
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
      setErrMsg(error.message);
    }
  };

  return (
    <div className="register">
      <div className="hero">
        <HeroLogo className="hero_img" />
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-field">
            <input type="email" required />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input type="password" required />
            <label>Enter your password</label>
          </div>

          <button type="submit">Login</button>
          <div className="register">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
