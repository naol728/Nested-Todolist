export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center  bg-light-background dark:bg-dark-background">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}
