"use client";

import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful!");
    }, 1500);
  };

  return (
    <div className="login-page">
      {/* Decorative blurred background shapes */}
      <div className="login-bg-shape login-bg-shape-1"></div>
      <div className="login-bg-shape login-bg-shape-2"></div>
      <div className="login-bg-shape login-bg-shape-3"></div>

      {/* Elegant background watermark */}
      <div className="login-bg-watermark">VJAY SOFTWARE</div>

      <div className="login-card">
        {/* Top gradient header */}
        <div className="login-header">
          <div className="login-logo-wrapper">
            <span className="login-vj-logo">
              V<span className="login-vj-dot">J</span>
            </span>
          </div>
          <h1 className="login-welcome">WELCOME!</h1>
          <p className="login-company">VJAY SOFTWARE PVT LTD</p>
        </div>

        {/* Form body */}
        <div className="login-body">
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Email field */}
            <div className="login-field">
              <div className="login-field-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </div>

            {/* Password field */}
            <div className="login-field">
              <div className="login-field-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Remember me */}
            <label className="login-remember" htmlFor="login-remember-check">
              <input
                id="login-remember-check"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-checkbox"
              />
              <span className="login-checkmark"></span>
              Remember me?
            </label>

            {/* Submit button */}
            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="login-spinner"></span>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <span className="login-footer-designed">DESIGNED & DEVELOPED</span>{" "}
          BY{" "}
          <span className="login-footer-company">
            VJAY SOFTWARE PVT. LTD.
          </span>
        </div>
      </div>
    </div>
  );
}
