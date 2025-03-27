import React, { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import { Link } from "react-router";
import Button from "../components/Button";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log("User Registered:", { email, password });
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-light-foreground dark:text-dark-foreground mb-6">
          Create an Account 🚀
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit">Sign In</Button>

          <div className="text-sm text-center text-light-muted dark:text-dark-muted mt-3">
            Already have an account?{" "}
            <Link
              to="/"
              className="hover:underline text-light-primary dark:text-dark-primary"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
