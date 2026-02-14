import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-4 bg-dark text-light shadow-md">
      
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <img src="/logo.png" alt="logo" className="h-10" />

        <Link to="/" className="hover:text-secondary transition">
          About
        </Link>

        <Link to="/explore" className="hover:text-secondary transition">
          Explore Mentors
        </Link>
      </div>

      {/* Right Side */}
      <Link
        to="/auth"
        className="px-6 py-2 bg-primary rounded-full hover:scale-105 transition"
      >
        Get Started
      </Link>
    </nav>
  );
}

export default Navbar;
