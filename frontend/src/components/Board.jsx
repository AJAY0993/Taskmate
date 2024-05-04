import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Menus from "./Menus";
import useDelete from "../hooks/useDelete";
import Modal from "./Modal";
import { getBoardTasks } from "../reducer/tasksSlice";
import Form from "./Form";
import useUpdate from "../hooks/useUpdate";

function Board({ board }) {
  const { title, description, _id: id } = board;
  const navigate = useNavigate();
  const boardTasks = useSelector(getBoardTasks(id));
  const { deleteOne } = useDelete();
  const { update, isLoading } = useUpdate();
  const handleDelete = () => {
    deleteOne(id, "board");
  };
  const navigateToTasks = (e) => {
    if (!e.target.closest(".absolute")) navigate(id);
    return;
  };
  const bgs = [
    "bg-orange-400 border-orange-600",
    "bg-red-400 border-red-600",
    "bg-yellow-400 border-yellow-600",
    "bg-green-500 border-green-600",
    "bg-indigo-400 border-indigo-600",
  ];
  const totalTasks = boardTasks.length;
  const compeltedTasks = boardTasks.filter(
    (task) => task.status === "completed",
  ).length;
  const inProgressTasks = boardTasks.filter(
    (task) => task.status === "inProgress",
  ).length;

  const bg = bgs[Math.floor(Math.random() * 5)];
  return (
    <li
      className={`relative w-[300px] max-w-[30rem] rounded-lg border-2 ${bg}  bg-neutral-50 px-4 py-2 text-neutral-50`}
      onClick={navigateToTasks}
    >
      <Menus.Toggle id={id}>
        <button className="absolute right-4 top-4">
          <HiDotsVertical className="text-xl" />
        </button>
      </Menus.Toggle>
      <Menus.List id={id} top="2.2rem" right="1rem">
        <Modal.Open id="updateBoard">
          <Menus.Item Icon={FaPencilAlt}>Edit</Menus.Item>
        </Modal.Open>
        <Menus.Item onClick={handleDelete} Icon={FaTrash}>
          Delete
        </Menus.Item>
      </Menus.List>
      <Modal.Window id="updateBoard">
        <Form
          type="board"
          operation="update"
          defaultValues={board}
          onSubmit={update}
          isSubmitting={isLoading}
        />
      </Modal.Window>
      <h3 className="text-xl font-semibold capitalize">{title}</h3>
      <p>{description}</p>
      <p className="font-medium">
        Total Tasks: <span>{totalTasks}</span>
      </p>
      <p className="font-medium">
        Completed Tasks: <span>{compeltedTasks}</span>
      </p>
      <p className="font-medium">
        Tasks in Progress: <span>{inProgressTasks}</span>
      </p>
    </li>
  );
}

export default Board;
