import { useRef } from "react";
import axios from "../utils/axios";
import { isEmail } from "validator";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, login } from "../reducer/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const confirmPasswordRef = useRef();
  const passwordRef = useRef();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (
        email === "" ||
        password === "" ||
        username === "" ||
        confirmPassword === ""
      )
        return toast.error("Please provide email and password");

      if (!isEmail(email)) return toast.error("Please provide a valid email");

      if (password.length < 8 || password.length > 20)
        return toast.error(
          "Password should be 8 character long and do not exceed 20",
        );

      if (confirmPassword !== password)
        return toast.error("Passwords do not match");

      const res = await axios("users/signup", {
        method: "post",
        data: {
          email,
          username,
          password,
          confirmPassword,
        },
      });
      const user = res.data.user;
      dispatch(login(user));
      toast.success("Lets Go yeah!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) return <Navigate to="/" replace />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 ">
      <h3 className="text-center text-3xl font-semibold capitalize">Sign up</h3>
      <form
        className="mt-4 flex w-[30rem] max-w-full flex-col items-center gap-4 rounded-lg border-2 border-gray-200  p-2 shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Email ref */}

        <div className="flex items-center  gap-2">
          <label className="w-20 font-medium" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            className="input"
            ref={emailRef}
            placeholder="Email"
          />
        </div>

        {/* Username Ref */}
        <div className=" flex  items-center gap-2">
          <label className="w-20 font-medium" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            className="input"
            ref={usernameRef}
            placeholder="Username"
          />
        </div>

        {/* Password */}
        <div className="flex  items-center gap-2">
          <label className="w-20 font-medium" htmlFor="password">
            Password:
          </label>
          <input
            className="input"
            id="password"
            type="password"
            ref={passwordRef}
            placeholder="Password"
          />
        </div>

        {/*Confirm password */}
        <div className="flex items-center gap-2">
          <label className="w-20 font-medium" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="input"
            ref={confirmPasswordRef}
            placeholder="Confirm password"
          />
        </div>

        <div className="mt-8 w-72">
          <Button stretch={true}>Login</Button>
          <p className="text-center">
            already registered ?
            <Link className="text-blue-400 underline" to="/login">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
