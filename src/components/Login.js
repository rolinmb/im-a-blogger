import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../fbase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, /* error */ ] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/home");
    }
  }, [user, loading]);

  return (
    <div className="login-page">
      <div className="login__container">
        <h3>You Are Logged Out!</h3>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address" />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" />
        <button
          className="login__btn"
          onClick={() => {
            logInWithEmailAndPassword(email, password);
            navigate("/home");
          }}>Login</button>
      </div>
    </div>
  );
}

export default Login;