import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../reducer/userSlice";
import axios from "../utils/axios";
import toast from "react-hot-toast";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleLogout = async () => {
    try {
      await axios("users/logout");
      dispatch(logout());
      toast.success("Logged out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="absolute left-0 right-0 top-0 z-50 bg-neutral-50">
      <div className="flex justify-between px-4 py-2">
        <div className="text-xl font-medium capitalize text-blue-400">
          Task Mate
        </div>
        <div className="flex gap-2 space-x-2">
          <img
            className="aspect-square h-10 rounded-full border-blue-400"
            src={user?.profilePic}
          />

          <Button type="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
