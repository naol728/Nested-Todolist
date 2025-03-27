export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-background dark:bg-dark-background">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 border-4 border-light-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-light-foreground dark:text-dark-foreground font-medium text-lg">
          Loading...
        </p>
      </div>
    </div>
  );
}
