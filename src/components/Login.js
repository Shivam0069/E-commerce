import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getUserDetails = () => {
  const userDetailsString = localStorage.getItem("userDetails");
  return userDetailsString ? JSON.parse(userDetailsString) : null;
};

export default function Login() {
  const navigate = useNavigate();
  const data = getUserDetails();
  if (data) {
    navigate("/home");
  }

  const [canLogin, setCanLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    setCanLogin(username.trim() !== "" && password.trim() !== "");
  }, [username, password]);

  const saveUserDetails = (userDetails) => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  };

  async function loginHandler() {
    if (loading) {
      return; // Prevent multiple clicks while loading
    }

    setLoading(true); // Set loading to true when login starts

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "kminchelle",
          password: "0lelplR",
        }),
      });

      const data = await res.json();
      if (data.token) {
        saveUserDetails(data);
        navigate("/home");
      } else {
        console.log(Error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Set loading back to false, whether login succeeded or failed
    }
  }

  return (
    <div className="bg-[url('https://www.sagatraining.ca/wp-content/uploads/2018/10/background-images-for-login-form-8.jpg')] h-screen  ">
      <div className="max-w-xl relative top-20  ">
        <div className="max-w-md mx-auto bg-black bg-opacity-50 pb-20">
          <div className="max-w-sm mx-auto p-10  ">
            <div className="text-white text-3xl font-semibold mt-7">Log in</div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#333333] border w-full text-white text-sm pl-6 py-4 rounded-md mt-7"
              type="text"
              placeholder="Username"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#333333] border w-full text-sm text-white pl-6 py-4 rounded-md mt-4"
              type="password"
              placeholder="Password"
            />
            <button
              onClick={loginHandler}
              className={`bg-[#E50914] w-full text-white text-center py-4 mt-10 rounded-md ${
                !canLogin && "cursor-not-allowed opacity-50"
              }`}
              disabled={!canLogin || loading} // Disable the button while loading
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
