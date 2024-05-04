import { useState } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { deleteBoard } from "../reducer/boardsSlice";
import { useDispatch } from "react-redux";
import { deleteTask } from "../reducer/tasksSlice";

function useDelete() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const deleteOne = async (id, resourceType) => {
    try {
      const isBoard = resourceType === "board";
      const endPoint = isBoard ? `boards/${id}` : `tasks/${id}`;
      setIsLoading(true);
      await axios(endPoint, { method: "delete" });
      if (isBoard) {
        dispatch(deleteBoard(id));
      } else {
        dispatch(deleteTask(id));
      }
      setIsLoading(false);
      toast.success(`${resourceType} deleted successfully`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return { deleteOne, isLoading };
}

export default useDelete;
