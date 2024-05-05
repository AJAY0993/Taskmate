import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../components/Button";
import Task from "../components/Task";
import AppLayout from "../components/AppLayout";
import Menus from "../components/Menus";
import AppHeader from "../components/AppHeader";
import Modal from "../components/Modal";
import Form from "../components/Form";
import useCreate from "../hooks/useCreate";
import toast from "react-hot-toast";
import { getBoard } from "../reducer/boardsSlice";
import { getBoardTasks } from "../reducer/tasksSlice";

function Board() {
  const [visible, setVisible] = useState("all");
  const { id } = useParams();
  const tasks = useSelector(getBoardTasks(id));
  const board = useSelector(getBoard(id));
  const { create,isLoading } = useCreate();

  const handleSubmit = (data) => {
    for (let key in data) {
      if (data[key] === "") {
        toast.error("Please fill all the required field");
        return;
      }
    }
    create(data, "task");
  };

  const tasksToBeRender = tasks.filter((task) => {
    if (visible === "all") return true;
    return task.status === visible;
  });

  return (
    <AppLayout>
      <AppHeader>
        <div className="absolute right-4 top-4">
          <Modal.Open id="board">
            <Button type="primary">
              <IoMdAddCircleOutline className="mx-1 inline text-2xl" />
              <span>New task</span>
            </Button>
          </Modal.Open>
          <Modal.Window id="board">
            <Form
              type="task"
              operation="create"
              board={id}
              isSubmitting={isLoading}
              onSubmit={handleSubmit}
            />
          </Modal.Window>
        </div>
        <h3 className="text-3xl font-semibold text-neutral-50">
          {board.title}
        </h3>
        <p className="text-neutral-50">{board.description}</p>
      </AppHeader>
      <section className="p-2">
        <div className="flex justify-between gap-2">
          <Button
            type={visible === "all" ? "primary" : "secondary"}
            onClick={() => setVisible("all")}
          >
            <span className="text-sm">All Tasks</span>
          </Button>
          <Button
            type={visible === "todo" ? "primary" : "secondary"}
            onClick={() => setVisible("todo")}
          >
            <span className="text-sm">Todo</span>
          </Button>
          <Button
            type={visible === "inProgress" ? "primary" : "secondary"}
            onClick={() => setVisible("inProgress")}
          >
            <span className="text-sm">In progress</span>
          </Button>
          <Button
            type={visible === "completed" ? "primary" : "secondary"}
            onClick={() => setVisible("completed")}
          >
            <span className="text-sm">Completed</span>
          </Button>
        </div>

        <ul className="flex flex-wrap justify-around gap-4 px-4 py-2">
          <Menus>
            {tasksToBeRender.map((task) => (
              <Task task={task} key={task._id} />
            ))}
          </Menus>
        </ul>
        {tasks.length > 0 && tasksToBeRender.length === 0 && (
          <h1>No Tasks! with status {visible}</h1>
        )}
        {tasks.length === 0 && <h1>No Tasks! Start adding now</h1>}
      </section>
    </AppLayout>
  );
}

export default Board;
