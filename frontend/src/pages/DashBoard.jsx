import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../components/Button";
import AppLayout from "./../components/AppLayout";
import Menus from "../components/Menus";
import AppHeader from "../components/AppHeader";
import { useSelector } from "react-redux";
import { getBoards } from "../reducer/boardsSlice";
import Modal from "../components/Modal";
import Form from "../components/Form";
import useCreate from "../hooks/useCreate";
import Board from "../components/Board";

function DashBoard() {
  const boards = useSelector(getBoards);

  const { create, isLoading } = useCreate();

  return (
    <AppLayout>
      <AppHeader>
        <div className="absolute right-4 top-4">
          <Modal.Open id="createBoard">
            <Button type="primary">
              <IoMdAddCircleOutline className="mx-1 inline text-2xl" />
              <span>New Board</span>
            </Button>
          </Modal.Open>

          <Modal.Window id="createBoard">
            <Form
              onSubmit={create}
              isSubmitting={isLoading}
              type="board"
              operation="create"
            />
          </Modal.Window>
        </div>
        <h3 className="text-3xl font-semibold text-neutral-50">Dashboard</h3>
      </AppHeader>
      <section className="p-2">
        <ul className="flex flex-wrap justify-around gap-4 px-4 py-2">
          <Menus>
            {boards.map((board) => (
              <Board board={board} key={board._id} />
            ))}
          </Menus>
        </ul>
        {boards.length === 0 && <h1>No boards! please add 1</h1>}
      </section>
    </AppLayout>
  );
}

export default DashBoard;
