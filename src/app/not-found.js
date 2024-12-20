export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>

      <a
        href="/"
        className="mt-6 px-8 py-3 bg-[#0E8E72] text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none transition duration-300"
      >
        Go Back Home
      </a>

      <div className="mt-10">
        <img
          src="/images/not-found.jpg"
          alt="Not Found Illustration"
          className="w-80 h-60 object-contain mx-auto"
        />
      </div>
    </div>
  );
}
