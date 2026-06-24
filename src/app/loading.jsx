export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="mt-6 text-2xl font-bold text-gray-700">Loading...</h2>

        <p className="text-gray-500 mt-2">
          Please wait while we load your lessons.
        </p>
      </div>
    </div>
  );
}
