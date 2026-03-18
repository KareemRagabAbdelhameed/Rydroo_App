const Dashboard = () => {
    return (
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Trips" value="120" />
        <StatCard title="Active Drivers" value="18" />
        <StatCard title="Today Bookings" value="45" />
      </div>
    );
  };
  
  const StatCard = ({ title, value }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-maincolor mt-2">
        {value}
      </p>
    </div>
  );
  
  export default Dashboard;