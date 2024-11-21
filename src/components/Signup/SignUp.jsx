import React from "react";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { auth } from "../../firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    console.log(email, password, terms, name, photo);
    // reset error message
    setErrorMessage("");
    setSuccess(false);
    if (!terms) {
      setErrorMessage("Please accept our terms and condition");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "at least one uppercase, one lowercase, one lowercase , one number, one special character"
      );
      return;
    }
    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        //send verification email address
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification email sent");
        });
        // Update profile name and photo URL
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("user profile updated");
          })
          .catch((error) => {
            console.log("User Profile Update Error");
          });
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen w-full">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-4xl text-center font-bold p-2">Sign Up now!</h1>
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>
              <input
                type="text"
                placeholder="Image"
                className="input input-bordered"
                name="photo"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 top-12"
              >
                {showPassword ? <FaEye></FaEye> : <FaRegEyeSlash />}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input name="terms" type="checkbox" className="checkbox" />
                  <span className="label-text ml-2">
                    Accept our terms and condition
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {success && <p className="text-green-500">Sign Up is successfull </p>}
          <p className="m-2">
            Already have account? please{" "}
            <Link className="text-green-600 font-bold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
