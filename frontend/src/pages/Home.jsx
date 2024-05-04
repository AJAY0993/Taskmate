import { useSelector } from "react-redux";
import { MdLeaderboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import AppHeader from "../components/AppHeader";
import AppLayout from "./../components/AppLayout";
import StatCard from "../components/StatCard";

import {
  getCompletedTasks,
  getInProgressTasks,
  getOverdueTasks,
  getTasks,
} from "../reducer/tasksSlice";
import { getBoards } from "../reducer/boardsSlice";
import { getUser } from "../reducer/userSlice";

function Home() {
  const user = useSelector(getUser);
  const boards = useSelector(getBoards).length;
  const tasks = useSelector(getTasks).length;
  const completedTasks = useSelector(getCompletedTasks).length;
  const inProgress = useSelector(getInProgressTasks).length;
  const overdueTasks = useSelector(getOverdueTasks).length;

  return (
    <AppLayout>
      <AppHeader>
        <h3 className="text-3xl font-semibold text-neutral-50">
          Hello {user?.username}
        </h3>
      </AppHeader>
      <section className="p-2">
        <div className="flex flex-wrap gap-4">
          <StatCard title="total boards" Icon={MdLeaderboard} num={boards} />
          <StatCard title="total tasks" Icon={FaTasks} num={tasks} />
          <StatCard
            title="completed tasks"
            Icon={MdOutlineTaskAlt}
            num={completedTasks}
          />
          <StatCard
            title="tasks in progress"
            Icon={GrInProgress}
            num={inProgress}
          />
          <StatCard
            title="overdue tasks"
            Icon={MdOutlinePendingActions}
            num={overdueTasks}
          />
        </div>
      </section>
    </AppLayout>
  );
}

export default Home;
