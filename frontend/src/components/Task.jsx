import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import useDelete from "../hooks/useDelete";
import Menus from "./Menus";
import Modal from "./Modal";
import useUpdate from "../hooks/useUpdate";
import Form from "./Form";

function Task({ task }) {
  const { deleteOne } = useDelete();
  const { update, isLoading } = useUpdate();
  const { title, description, _id: id, priority, tags, dueDate, status } = task;
  const date = new Date(dueDate);
  const formattedDate = date.toLocaleDateString(date, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const getBg = () => {
    if (status === "todo") return "bg-blue-400 border-blue-600";
    if (status === "inProgress") return "bg-orange-400 border-orange-600";
    if (status === "comepleted") return "bg-green-400 border-green-600";
  };

  const taskBg = getBg(status);
  const handleDelete = () => {
    deleteOne(id, "task");
  };

  const bg = `${priority === "high" ? "bg-red-400" : priority === "medium" ? "bg-yellow-400" : "bg-green-400"}`;
  return (
    <li
      className={` w-300 relative max-w-[30rem] rounded-lg border-2 ${taskBg} px-4 py-2 text-neutral-50`}
    >
      <span className="absolute right-12 top-4  rounded-xl bg-blue-400 px-2 py-1">
        {status}
      </span>
      <span
        className={`inline-block rounded-3xl ${bg} px-3 py-1 capitalize text-neutral-50`}
      >
        {priority}
      </span>
      <Menus.Toggle id={id}>
        <button className="absolute right-4 top-4">
          <HiDotsVertical className="text-xl" />
        </button>
      </Menus.Toggle>
      <Menus.List id={id} top="2.2rem" right="1rem">
        <Modal.Open id="taskUpdate">
          <Menus.Item Icon={FaPencilAlt}>Edit</Menus.Item>
        </Modal.Open>
        <Menus.Item onClick={handleDelete} Icon={FaTrash}>
          Delete
        </Menus.Item>
      </Menus.List>
      <Modal.Window id="taskUpdate">
        <Form
          type="task"
          operation="update"
          defaultValues={task}
          onSubmit={update}
          isSubmitting={isLoading}
        />
      </Modal.Window>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p>{description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <li className="rounded bg-slate-600 p-2 text-neutral-50" key={i}>
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-2 font-medium">
        Due Date: <span>{formattedDate}</span>
      </p>
    </li>
  );
}

export default Task;
