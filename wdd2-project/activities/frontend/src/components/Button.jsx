import "../components/Button.css";
const Button = ({
  children,
  loading,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
