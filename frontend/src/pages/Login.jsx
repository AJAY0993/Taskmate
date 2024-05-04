import { useRef } from "react";
import axios from "../utils/axios";
import { isEmail } from "validator";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getIsAuthenticated, login } from "../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (email === "" || password === "")
        return toast.error("Please provide email and password");

      if (!isEmail(email)) return toast.error("Please provide a valid email");

      if (password.length < 8 || password.length > 20)
        return toast.error(
          "Password should be 8 character long and do not exceed 20",
        );
      const res = await axios("users/login", {
        method: "post",
        data: {
          email,
          password,
        },
      });
      const user = res.data.user;
      dispatch(login(user));
      toast.success("Welcome back");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h3 className="text-center text-3xl font-semibold capitalize">Login</h3>
      <form
        className="mt-4 flex w-[30rem] max-w-full flex-col items-center gap-4 rounded-lg border-2 border-gray-200  p-2 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center  gap-2">
          <label className="w-20 font-medium" htmlFor="email">
            Email:
          </label>
          <input id="email" className="input" ref={emailRef} />
        </div>
        <div className="mt-8 flex  items-center gap-2">
          <label className="w-20 font-medium">Password:</label>
          <input
            className="input"
            type="password"
            ref={passwordRef}
            autoComplete="off"
          />
        </div>
        <div className="mt-8 w-72">
          <Button stretch={true}>Login</Button>
          <p className="text-center">
            New to Task Mate ?{" "}
            <Link className="text-blue-400 underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
