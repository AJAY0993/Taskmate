import { CgSpinner } from "react-icons/cg";

function FullPageLoader() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <CgSpinner className="text-3xl text-blue-400" />
    </div>
  );
}

export default FullPageLoader;
