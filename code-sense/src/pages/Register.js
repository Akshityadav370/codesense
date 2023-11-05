import React, { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { ReactComponent as HeroLogo } from "../images/undraw_code_thinking_re_gka2.svg";
import "../styles/Register.css";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";



export default function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/register" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    e.target[0].value = "";
    const email = e.target[1].value;
    e.target[1].value = "";
    const password = e.target[2].value;
    e.target[2].value = "";

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      //create user on firestore
      const saved = await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });
      if (saved) {
        console.log(saved);
      } else {
        console.log('error');
      }
      navigate("/login");
    } catch (err) {
      setErr(true);
      setErrMsg(err.message);
    }
  };

  return (
    <div className="register">
      <div className="hero">
        <HeroLogo className="hero_img" />
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-field">
            <input type="text" required />
            <label>Enter your name</label>
          </div>
          <div className="input-field">
            <input type="email" required />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input type="password" required />
            <label>Enter your password</label>
          </div>

          <button type="submit">Register</button>
          <div className="register">
            <p>
              Have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
