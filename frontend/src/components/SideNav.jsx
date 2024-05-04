import { AiFillAppstore } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <nav className=" absolute bottom-0 left-0 z-50  w-full bg-neutral-50 md:bottom-0 md:top-0 md:mt-8 md:w-36">
      <ul className="flex w-full items-center justify-between gap-4 border-gray-500 p-2 md:w-36 md:flex-col md:items-start md:gap-8  md:p-4">
        <li>
          <Link
            className={`flex items-center gap-2  rounded-lg ${location.pathname === "/" ? "text-blue-700" : "text-gray-500"}`}
            to="/"
          >
            <FaHome className="text-2xl" />
            <span className="hidden text-lg  font-medium md:block">Home</span>
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center gap-2  hover:text-blue-400 ${location.pathname === "/dashboard" ? "text-blue-700" : "text-gray-500"}`}
            to="/dashboard"
          >
            <AiFillAppstore className="text-2xl" />
            <span className="hidden text-lg font-medium   md:block">
              Dashboard
            </span>
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center gap-2 hover:text-blue-400  ${location.pathname === "/about" ? "text-blue-700" : "text-gray-500"}`}
            to="/about"
          >
            <CgProfile className="text-2xl" />
            <span className="hidden text-lg  font-medium  md:block ">
              About
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;
