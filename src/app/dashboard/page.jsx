export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow">
          Total Lessons: 24
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow">
          Favorites: 10
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow">
          Recent Activity
        </div>
      </div>
    </div>
  );
}
