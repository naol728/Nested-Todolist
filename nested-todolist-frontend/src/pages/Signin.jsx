import React, { useState } from "react";

import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/Toast";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginUser } from "../services/authService";

export default function Signin() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState(null);
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credential));
    if (loginUser.fulfilled.match(result)) {
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/home"), 2000);
    } else {
      setToast({ message: error || "Invalid credentials", type: "error" });
    }
  };

  return (
    <AuthLayout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-light-foreground dark:text-dark-foreground mb-6">
          Welcome Back 👋
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={credential.email}
            onChange={(e) => handleChange(e)}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            value={credential.password}
            onChange={(e) => handleChange(e)}
          />

          <Button type="submit" styles="submit" loading={loading}>
            {loading ? "Signing..." : " Sign In"}
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
