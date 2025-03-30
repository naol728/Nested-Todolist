import React, { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { loginUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(credential));
      if (result?.meta?.requestStatus === "fulfilled") {
        navigate("/home");
      } else {
        console.error("Login failed:", result);
      }
    } catch (err) {
      console.error("An error occurred during login:", err);
    }
  };
  console.log(error);
  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-light-foreground dark:text-dark-foreground mb-6">
          Welcome Back 👋
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={credential.email}
            onChange={(e) => handleChange(e)}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={credential.password}
            onChange={(e) => handleChange(e)}
          />

          <Button type="submit" loading={loading}>
            {loading ? "Loading..." : " Sign In"}
          </Button>

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
