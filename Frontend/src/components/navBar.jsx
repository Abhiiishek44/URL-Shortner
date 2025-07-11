import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
        🚀 URL Shortener
      </Link>

      {/* Desktop Links */}
      <div className="space-x-2 hidden sm:flex">
        <NavLink to="/" className={navLinkStyles}>
          Home
        </NavLink>
        <NavLink to="/login" className={navLinkStyles}>
          Login
        </NavLink>
        <NavLink to="/register" className={navLinkStyles}>
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
