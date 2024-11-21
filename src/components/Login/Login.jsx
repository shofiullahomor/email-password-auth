import React from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // reset status
    setSuccess(false);
    setLoginError("");
    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (!result.user.emailVerified) {
          setLoginError("Please verify your email address");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setLoginError(error.message);
      });
  };
  const handleForgetPassword = () => {
    console.log("get me email address", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please provide a valid email address");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Password Reset email address");
      });
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen max-w-4xl mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                ref={emailRef}
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <label onClick={handleForgetPassword} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {success && <p className="text-green-900">User Login Successfull</p>}
          {loginError && <p className="text-red-600">{loginError}</p>}
          <p className="p-4">
            You have no account? please{" "}
            <Link className="text-green-500" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
