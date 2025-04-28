import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
 
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileDropdown, setProfileDropdown] = React.useState(false);
  
  const navLinkClass =
    "relative transition-colors duration-200 hover:text-[#6A38C2] px-2 py-1 focus:outline-none after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#6A38C2] after:to-[#F83002] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="backdrop-blur-xl bg-white/70 sticky top-0 z-50 shadow-lg border-b border-gray-100 font-sans transition-all duration-300">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6">
        <Link to="/" className="flex items-center gap-3 group select-none">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6A38C2] to-[#F83002] flex items-center justify-center shadow-md mr-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#fff" /></svg>
          </span>
          <span className="text-3xl font-extrabold tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-[#F83002]">
            Job<span className="text-[#F83002] group-hover:text-[#b31d00]">Nexus</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex font-medium items-center gap-7 text-lg">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className={navLinkClass}>Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className={navLinkClass}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className={navLinkClass}>Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className={navLinkClass}>Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" className={navLinkClass}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          <div className="h-8 w-px bg-gray-200 mx-3" />
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 text-gray-700 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-200">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] rounded-full px-7 py-2 text-white font-semibold shadow-md transition-all duration-200 hover:scale-105">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 relative">
              {user && user.role === "student" && (
                <Link to="/profile">
                  <Button variant="outline" className="rounded-full px-5 py-2 border-gray-300 text-gray-700 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-200">Profile</Button>
                </Link>
              )}
              <Button
  onClick={logoutHandler}
  className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] rounded-full px-7 py-2 text-white font-semibold shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2"
>
  <LogOut className="inline-block w-5 h-5" /> Logout
</Button>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="relative w-10 h-10 flex flex-col justify-center items-center group"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Open Menu"
          >
            <span className={`block h-0.5 w-7 rounded-sm bg-gradient-to-r from-[#6A38C2] to-[#F83002] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-7 rounded-sm bg-gradient-to-r from-[#6A38C2] to-[#F83002] my-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-7 rounded-sm bg-gradient-to-r from-[#6A38C2] to-[#F83002] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-lg animate-fadeIn z-40">
          <ul className="flex flex-col gap-2 py-4 px-6 text-lg">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" className="block py-2 px-2 rounded-lg hover:bg-gray-100 transition-all" onClick={() => setMobileMenuOpen(false)}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          <div className="border-t border-gray-100 mx-6" />
          <div className="flex flex-col gap-2 py-4 px-6">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full px-6 py-2 border-gray-300 text-gray-700 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-200">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] rounded-full px-7 py-2 text-white font-semibold shadow-md transition-all duration-200 hover:scale-105">Signup</Button>
                </Link>
              </>
            ) : (
              <>
                {user && user.role === "student" && (
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full px-5 py-2 border-gray-300 text-gray-700 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-200">Profile</Button>
                  </Link>
                )}
                <Button
  onClick={() => { logoutHandler(); setMobileMenuOpen(false); }}
  className="w-full bg-gradient-to-r from-[#6A38C2] to-[#F83002] rounded-full px-7 py-2 text-white font-semibold shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2 mt-1"
>
  <LogOut className="inline-block mr-2 w-5 h-5" /> Logout
</Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
