import { useState } from "react";
import "../components/Input.css";
const Input = ({ label, error, showToggle, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        <input
          className={`input-field ${error ? "input-error" : ""}`}
          type={inputType}
          {...props}
        />
        {showToggle && isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
