import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-maincolor">
          Rydroo Admin
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        <NavItem to="/admin/dashboard" label="Dashboard" />
        <NavItem to="/admin/trips" label="Trips" />
        <NavItem to="/admin/drivers" label="Drivers" />
      </nav>
    </aside>
  );
};

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-lg font-medium transition ${
        isActive
          ? "bg-orange-100 text-maincolor"
          : "text-gray-700 hover:bg-orange-50"
      }`
    }
  >
    {label}
  </NavLink>
);

export default Sidebar;