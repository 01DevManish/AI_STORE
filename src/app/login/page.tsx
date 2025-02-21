"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase"; // Adjust import path based on project structure

const AuthForm: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const toggleForm = () => setIsLogin(!isLogin);

  // Function for handling social login (Google, Facebook, GitHub)
  const handleAuth = async (
    provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider
  ) => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login successful!");
      router.push("/dashboard"); // Redirect after login
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    }
  };

  // Function for handling email/password login & signup
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign up successful!");
      }
      router.push("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-200 mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleEmailAuth}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-400">
            {isLogin ? "Or login with" : "Or sign up with"}
          </span>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => handleAuth(new GoogleAuthProvider())} className="text-red-500 hover:text-red-600 transition">
            <FaGoogle size={24} />
          </button>
          <button onClick={() => handleAuth(new FacebookAuthProvider())} className="text-blue-500 hover:text-blue-600 transition">
            <FaFacebook size={24} />
          </button>
          <button onClick={() => handleAuth(new GithubAuthProvider())} className="text-gray-500 hover:text-gray-600 transition">
            <FaGithub size={24} />
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button onClick={toggleForm} className="text-blue-400 hover:underline ml-2 focus:outline-none">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
