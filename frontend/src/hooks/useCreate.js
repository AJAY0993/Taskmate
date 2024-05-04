import { useState } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { addBoard } from "../reducer/boardsSlice";
import { useDispatch } from "react-redux";
import { addTask } from "../reducer/tasksSlice";

function useCreate() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const create = async (data, resourceType) => {
    try {
      const isBoard = resourceType === "board";
      const endPoint = isBoard ? `boards` : `tasks`;
      setIsLoading(true);
      const res = await axios(endPoint, { method: "post", data });
      if (isBoard) {
        const data = res.data.board;
        dispatch(addBoard(data));
      } else {
        const data = res.data.task;
        dispatch(addTask(data));
      }
      setIsLoading(false);
      toast.success(`${resourceType} created successfully`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return { create, isLoading };
}

export default useCreate;
