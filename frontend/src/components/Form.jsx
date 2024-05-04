import { useRef } from "react";
import Button from "./Button";

function AppForm({
  type,
  onSubmit,
  defaultValues,
  board,
  isSubmitting,
  operation,
}) {
  const titleRef = useRef();
  const dueDateRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();

  const isUpdation = operation === "update";

  const defaultTitle = isUpdation ? defaultValues.title : "";
  const defaultDescription = isUpdation ? defaultValues.description : "";
  const defaultPriority = isUpdation ? defaultValues.priority : "";
  const defaultStatus = isUpdation ? defaultValues.status : "";
  const defaultDueDate = isUpdation ? defaultValues.dueDate?.split("T")[0] : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current?.value,
      priority: priorityRef.current?.value,
      status: statusRef.current?.value,
      board,
    };
    if (operation === "update") return onSubmit(data, defaultValues._id, type);
    onSubmit(data, type);
  };

  if (type === "board")
    return (
      <Form onSubmit={handleSubmit}>
        <div className="flex items-center  gap-2">
          <label className="w-20 font-medium" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            className="input"
            ref={titleRef}
            placeholder="Title"
            defaultValue={defaultTitle}
          />
        </div>

        <div className="flex items-center  gap-2">
          <label className="w-20 font-medium" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            className="input"
            ref={descriptionRef}
            placeholder="Description"
            defaultValue={defaultDescription}
          />
        </div>

        <div className="mt-4 w-full">
          <Button type="primary" stretch={true} disabled={isSubmitting}>
            {operation}
          </Button>
        </div>
      </Form>
    );

  return (
    <Form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="flex items-center  gap-2">
        <label className="w-20 font-medium" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          className="input"
          ref={titleRef}
          placeholder="Title"
          defaultValue={defaultTitle}
        />
      </div>

      {/* Description */}
      <div className="flex items-center  gap-2">
        <label className="w-20 font-medium" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          className="input"
          ref={descriptionRef}
          placeholder="Description"
          defaultValue={defaultDescription}
        />
      </div>

      {}
      {/* Due date */}

      <div className="flex items-center  gap-2">
        <label className="w-20 font-medium" htmlFor="title">
          Due Date:
        </label>
        <input
          type="date"
          id="title"
          className="input"
          ref={dueDateRef}
          placeholder="Due Date"
          defaultValue={defaultDueDate}
        />
      </div>

      {/* Priority */}
      <div className="flex items-center  gap-2">
        <label className="w-20 font-medium" htmlFor="priority">
          Priority:
        </label>
        <select
          type="select"
          id="priority"
          className="input"
          ref={priorityRef}
          defaultValue={defaultPriority}
        >
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>
      </div>

      {/* Status */}
      {type === "task" && (
        <div className="flex items-center  gap-2">
          <label className="w-20 font-medium" htmlFor="status">
            Status:
          </label>
          <select
            type="select"
            id="status"
            className="input"
            ref={statusRef}
            defaultValue={defaultStatus}
          >
            <option value="todo">todo</option>
            <option value="inProgress">inProgress</option>
            <option value="completed">completed</option>
          </select>
        </div>
      )}

      <div className="mt-4 w-full">
        <Button type="primary" stretch={true} disabled={isSubmitting}>
          {operation}
        </Button>
      </div>
    </Form>
  );
}

function Form({ children, onSubmit }) {
  return (
    <form
      className="flex max-w-full flex-col items-start gap-4 rounded-xl border-2 border-blue-400 bg-white p-2 sm:gap-6 sm:px-12 sm:py-8 md:gap-8 md:px-32 md:py-16"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
export default AppForm;
