
const Button = ({ children, onClick, type = "button", className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;