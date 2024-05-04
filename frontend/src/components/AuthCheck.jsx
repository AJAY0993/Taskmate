import { useDispatch } from "react-redux";
import { login } from "../reducer/userSlice";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { seedTasks } from "../reducer/tasksSlice";
import { seedboards } from "../reducer/boardsSlice";
import FullPageLoader from "./FullPageLoader";

function AuthCheck({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios("users/me");
        const user = res.data.user;
        const tasks = res.data.tasks;
        const boards = res.data.boards;
        dispatch(login(user));
        dispatch(seedTasks(tasks));
        dispatch(seedboards(boards));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) return <FullPageLoader />;
  return children;
}

export default AuthCheck;
