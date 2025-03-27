import React, { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import { Link } from "react-router";
import Button from "../components/Button";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-light-foreground dark:text-dark-foreground mb-6">
          Welcome Back 👋
        </h1>

        <form className="flex flex-col gap-4">
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

          <Button type="submit">Sign In</Button>

          <div className="text-sm text-center text-light-muted dark:text-dark-muted mt-3">
            I don't have an account?{" "}
            <Link
              to="/signup"
              className="hover:underline text-light-primary dark:text-dark-primary"
            >
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
