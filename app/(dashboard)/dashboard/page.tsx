export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      <p className="text-muted-foreground">
        Welcome to your SEO Dashboard. Here you can track your AI calls and post performances.
      </p>
      
      {/* Nơi lập trình stats cards sau này */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <p className="text-sm font-medium text-gray-500">Total Posts</p>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <p className="text-sm font-medium text-gray-500">AI Usage</p>
          <div className="text-2xl font-bold">45 / 100</div>
        </div>
      </div>
    </div>
  );
}
