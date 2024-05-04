import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import { updateBoard } from "../reducer/boardsSlice";
import { updateTask } from "../reducer/tasksSlice";

function useUpdate() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const update = async (data, id, resourceType) => {
    try {
      const isBoard = resourceType === "board";
      const endPoint = isBoard ? `boards/${id}` : `tasks/${id}`;
      setIsLoading(true);
      const res = await axios(endPoint, { method: "patch", data });
      if (isBoard) {
        const data = res.data.board;
        dispatch(updateBoard(data));
      } else {
        const data = res.data.task;
        dispatch(updateTask(data));
      }
      setIsLoading(false);
      toast.success(`${resourceType} Updated successfully`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return { update, isLoading };
}

export default useUpdate;
