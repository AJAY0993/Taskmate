function StatCard({ title, Icon, num }) {
  const bg =
    title === "total boards"
      ? "bg-yellow-400"
      : title === "total tasks"
        ? "bg-blue-400"
        : title === "tasks in progress"
          ? "bg-orange-400"
          : title === "completed tasks"
            ? "bg-green-400"
            : title === "overdue tasks"
              ? "bg-red-700"
              : "";

  return (
    <div
      className={`rounded-xl ${bg} relative flex h-32 min-w-72 flex-grow flex-col items-end justify-center px-4 text-right text-neutral-50`}
    >
      <span className="absolute left-2 top-1/2 flex aspect-square h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border-2 border-neutral-50">
        <Icon className="text-3xl" />
      </span>
      <h3 className="text-xl font-medium capitalize">
        {title} <br /> {num}
      </h3>
    </div>
  );
}

export default StatCard;
