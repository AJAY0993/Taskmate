import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { HiX } from "react-icons/hi";

const ModalContext = createContext();

function Modal({ children }) {
  const [openId, setOpenId] = useState();
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <ModalContext.Provider value={{ open, close, openId }}>
      {children}
    </ModalContext.Provider>
  );
}

function OverLay({ children }) {
  const { close } = useContext(ModalContext);
  return createPortal(
    <div className="fixed bottom-0 left-0  right-0 top-0 z-50 bg-neutral-50 bg-opacity-50">
      <div className="absolute right-4 top-4 z-50">
        <Button type="secondary" shape="circle" onClick={close}>
          <HiX />
        </Button>
      </div>
      <div className="absolute flex h-full w-full items-center justify-center px-4">
        {children}
      </div>
    </div>,
    document.body,
  );
}
function Open({ id, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(id) });
}

function Window({ children, id }) {
  const { openId } = useContext(ModalContext);
  if (openId !== id) return null;
  return <OverLay>{children}</OverLay>;
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
