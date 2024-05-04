import { cloneElement, createContext, useContext, useState } from "react";

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const open = setOpenId;
  const close = () => setOpenId("");
  return (
    <MenuContext.Provider value={{ open, close, openId }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id, children }) {
  const { open, close, openId } = useContext(MenuContext);

  const handleClick = () => {
    if (openId === id) close();
    if (openId !== id) open(id);
  };
  return cloneElement(children, { onClick: handleClick });
}

function MenuList({ id, children, top, left, right, bottom }) {
  const { openId } = useContext(MenuContext);
  if (openId !== id) return null;
  return (
    <ul
      className="absolute flex flex-col gap-2 rounded-lg bg-stone-400 "
      style={{ top, left, right, bottom }}
    >
      {children}
    </ul>
  );
}

function MenuListItem({ onClick, Icon, children }) {
  const { close } = useContext(MenuContext);
  const handleClick = () => {
    onClick();
    close();
  };
  return (
    <li className="rounded-lg px-4 py-2 hover:bg-stone-600">
      <button onClick={handleClick}>
        <Icon className="mr-1 inline-block" />
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = MenuList;
Menus.Item = MenuListItem;

export default Menus;
