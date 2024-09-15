import { useState } from "react";
import "./Login.css";
import SignupForm from "../signUp/SignUpForm";
import LoginForm from "./loginForm";

// the collection houses the user's own collection of funkos
// the general structure of the funko function contains the funko's name and image
function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [userFormData, setUserFormData] = useState({ username:"", email: "", password: "" });

  return (
    <div className="login-container">
      <h2>Login</h2>
      {isLoggingIn ? (
        <LoginForm userFormData={userFormData} setUserFormData={setUserFormData} />
      ) : (
        <SignupForm userFormData={userFormData} setUserFormData={setUserFormData} />
      )}
      <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
        {isLoggingIn ? "Need to create an account?" : "Already have an account?"}
      </button>
    </div>
  );
}

export default Login;
