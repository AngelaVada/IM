"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

const NewLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      router.refresh();
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border-4 border-pink-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Let's get you logged in 💕</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-pink-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-pink-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-full">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 px-4 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-200 disabled:opacity-50 font-semibold text-lg"
          >
            {loading ? "Logging in..." : "Login ✨"}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">New here?</p>
          <Link href="/register" className="text-pink-600 hover:text-pink-500 font-semibold underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
