export function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  