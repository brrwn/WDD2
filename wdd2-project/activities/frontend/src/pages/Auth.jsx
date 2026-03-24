import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Login.css";
import { useAuth } from "../contexts/AuthContext";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await login(loginData);
      alert("Login successfully");
    } catch (error) {
      setErrors({ login: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    if (signupData.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    setLoading(true);

    try {
      await register({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });
      alert("Account created successfully");
      // Reset form
      setSignupData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setActiveTab("login");
    } catch (error) {
      setErrors({ signup: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Welcome">
      <div className="auth-tabs">
        <button
          className={`auth-tab-button ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`auth-tab-button ${activeTab === "signup" ? "active" : ""}`}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Login Panel */}
      <div className={`auth-panel ${activeTab === "login" ? "active" : ""}`}>
        <form onSubmit={handleLoginSubmit} className="login-form">
          {errors.login && (
            <div className="alert-error">{errors.login}</div>
          )}
          <Input
            label="Email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            error={errors.email}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            error={errors.password}
            placeholder="Enter your password"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>

      {/* Sign Up Panel */}
      <div className={`auth-panel ${activeTab === "signup" ? "active" : ""}`}>
        <form onSubmit={handleSignupSubmit} className="login-form">
          {errors.signup && (
            <div className="alert-error">{errors.signup}</div>
          )}
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleSignupChange}
            error={errors.name}
            placeholder="Enter your full name"
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            error={errors.email}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            error={errors.password}
            placeholder="Enter your password"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleSignupChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default Auth;
