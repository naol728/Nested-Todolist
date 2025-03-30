import React, { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import { Link } from "react-router";
import Button from "../components/Button";

export default function Signup() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log(
      "User Registered:",
      formdata.name,
      formdata.email,
      formdata.password
    );
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-light-foreground dark:text-dark-foreground mb-6">
          Create an Account 🚀
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label="Name "
            type="name"
            name="name"
            placeholder="Enter your email"
            value={formdata.name}
            onChange={(e) => handleChange(e)}
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formdata.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formdata.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={formdata.confirmPassword}
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit">Sign In</Button>

          <div className="text-sm text-center text-light-muted dark:text-dark-muted mt-3">
            Already have an account?{" "}
            <Link
              to="/"
              className="hover:underline text-light-primary dark:text-dark-primary"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
