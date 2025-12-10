"use client";

import { Eye, EyeOff, Leaf, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import Image from "next/image";
import googleImage from "@/assets/google.png";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", { email, password,  redirect: false },  );
      setLoading(false);
      router.push("/")
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <motion.h1
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-4xl font-extrabold text-green-700 mb-2
        "
      >
        Welcome Back
      </motion.h1>
      <motion.p
      initial={{
        opacity:0
      }}
      animate={{
        opacity:1
      }}
      transition={{
        duration:0.6
      }}
      className="text-gray-600 mb-8 flex items-center">
        Login to Snapcart <Leaf className="w-5 h-5 text-green-600" />
      </motion.p>

      <motion.form
        onSubmit={handleLogin}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none
      ${
        email.length === 0
          ? "border-gray-300"
          : isValidEmail(email)
          ? "border-green-500"
          : "border-red-500"
      }
    `}
          />

          {email.length > 0 && !isValidEmail(email) && (
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid email.
            </p>
          )}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            value={password}
            autoComplete="new-password"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:outline-none
      ${
        password.length === 0
          ? "border-gray-300"
          : password.length >= 6
          ? "border-green-500"
          : "border-red-500"
      }
    `}
          />

          {showPassword ? (
            <Eye
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOff
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}

          {passwordFocused && password.length > 0 && password.length < 6 && (
            <p className="text-sm text-red-500 mt-1">
              Password must be at least 6 characters.
            </p>
          )}
        </div>

        {(() => {
          const formValidation =
            email !== "" &&
            isValidEmail(email) &&
            password !== "" &&
            password.length >= 6;
          return (
            <button
              disabled={!formValidation}
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${
                formValidation
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
            </button>
          );
        })()}

        <div className="flex items-center gap-2 text-gray-400 text-sm mt2">
          <span className="flex-1 h-px bg-gray-200"></span>
          OR
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>
        <div
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200 cursor-pointer"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={googleImage} width={20} height={20} alt="google" />
          Continue with Google
        </div>
      </motion.form>
      <motion.p
      initial={{
        opacity:0
      }}
      animate={{
        opacity:1
      }}
      transition={{
        duration:0.6
      }}
        onClick={() => router.push("/register")}
        className="text-gray-600 mt-6 text-sm flex items-center gap-1 cursor-pointer"
      >
        Want to create an account ? <LogIn className="w-4 h-4" />{" "}
        <span className="text-green-600 "> Sign Up</span>
      </motion.p>
    </div>
  );
};

export default LogInForm;
