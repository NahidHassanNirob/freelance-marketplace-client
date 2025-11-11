import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold text-gray-900">404</div>
        <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
