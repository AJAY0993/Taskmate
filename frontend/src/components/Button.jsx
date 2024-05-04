function Button({
  type = "primary",
  children,
  shape,
  onClick,
  stretch,
  disabled,
}) {
  const baseStyle = `cursor-pointer rounded-lg border-2  border-blue-500  px-2 py-1 capitalize disabled:cursor-not-allowed font-medium ${shape === "circle" ? "aspect-square rounded-full" : ""} ${stretch ? "w-full" : ""}`;
  if (type === "primary")
    return (
      <button
        className={`${baseStyle} bg-blue-500 text-neutral-50`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  if (type === "secondary")
    return (
      <button
        className={`${baseStyle} bg-transparent text-blue-500`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
}

export default Button;
