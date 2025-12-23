import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { loginSuccess } from "../redux/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = () => {
    const loginData = { email, password };

    axios
      .post("http://localhost:5000/api/auth/login", loginData)
      .then((res) => {
        dispatch(loginSuccess(res.data));
        navigate("/add-blog");
      })
      .catch((err) => {
        alert("Login failed");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-100 via-gray-100 to-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />


          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition shadow-md"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );

};

export default Login;
