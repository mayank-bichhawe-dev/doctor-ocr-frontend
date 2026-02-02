import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BarChart3, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { getUserByLocalStorage } from "../../../auth/utils";

export default function ReportListHeaderDropdown() {
  const { user } = getUserByLocalStorage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-all"
      >
        {/* User Avatar */}
        <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-indigo-600" />
        </div>

        {/* User Info */}
        <div className="text-left hidden md:block">
          <p className="text-sm font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>

        {/* Dropdown Icon */}
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info in Dropdown (mobile) */}
          <div className="px-4 py-3 border-b border-gray-200 md:hidden">
            <p className="text-sm font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          {/* Profile Link */}
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">My Profile</span>
          </Link>

          {/* Comparison Link */}
          <Link
            to={`/report/trend/${user?.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
            onClick={() => setIsDropdownOpen(false)}
          >
            <BarChart3 className="w-4 h-4 text-gray-600" />
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">Compare Reports</span>
              <span className="text-xs text-gray-500">
                View trends & changes
              </span>
            </div>
          </Link>

          {/* Settings Link */}
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
            onClick={() => setIsDropdownOpen(false)}
          >
            <Settings className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Settings</span>
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-all text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
