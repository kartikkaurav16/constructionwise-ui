"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi"; // Icon for email

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1500));

      // Dummy logic: show error if email doesn't include '@'
      if (!email.includes("@")) {
        throw new Error("Invalid email address");
      }

      console.log("Logged in:", email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <div className="bg-green-100 text-green-800 p-6 rounded shadow text-center w-full max-w-sm mx-auto">
          🎉 Login successful! Redirecting...
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-full max-w-sm"
        >
          <h2 className="text-2xl bg-pink-600 bg-sky-500/10 font-semibold text-black mb-4 text-center">
            Login
          </h2>

          <div className="relative w-full mb-4">
            {/* Icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiMail />
            </div>

            {/* Input field */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer pl-10 pt-5 pb-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder=" " // keep placeholder blank for floating label
            />

            {/* Floating label */}
            <label
              className="absolute left-10 top-2 text-gray-500 text-sm transition-all 
               peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
               peer-placeholder-shown:text-gray-400 
               peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Email
            </label>
          </div>

          <div className="relative w-full mb-4">
            {/* Icon (lock) */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiLock />
            </div>

            {/* Toggle visibility icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            {/* Input field */}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer pl-10 pr-10 pt-5 pb-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder=" "
            />

            {/* Floating label */}
            <label
              className="absolute left-10 top-2 text-gray-500 text-sm transition-all 
               peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
               peer-placeholder-shown:text-gray-400 
               peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Password
            </label>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
          )}

          <div className="relative group w-full flex flex-col items-center">
            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative px-4 py-2 w-full text-white bg-blue-600 rounded 
                       font-medium hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </div>
        </form>
      )}
    </>
  );
}
