import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AuthRequests from "../../apis/AuthRequests";

const SignupAuthenticate = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  //   pass token onto function
  const verifyToken = async (token) => {
    try {
      await AuthRequests.signupAuth(token);
      setMessage("Successfully Registered");
    } catch (err) {
      setError(true);
      setMessage(
        err.response.data.message || "Link must be invalid or expired"
      );
    }
  };

  useEffect(() => {
    if (!token) {
      setError(true);
      setMessage("Please paste your link in the url bar");
      return;
    }
    verifyToken(token);
  }, [token]);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      {error ? (
        <h1 className="h5 text-white">{message}</h1>
      ) : (
        <h1 className="h5 text-white">
          {message} <Link to="/signin">Sign in</Link>
        </h1>
      )}
    </div>
  );
};

export default SignupAuthenticate;
