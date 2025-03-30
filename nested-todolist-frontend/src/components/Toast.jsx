import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  const colorThemes = {
    success: "bg-[#28a745] text-white",
    error: "bg-[#dc3545] text-white",
    warning: "bg-[#ffc107] text-black",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${colorThemes[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
