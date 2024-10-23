"use client"
import { createContext, useState, ReactNode, useContext } from "react";


interface MenuContextType {
  open: boolean;
  toggle: () => void;
}

export const MenuContexts = createContext<MenuContextType>({
  open: false,
  toggle: () => { },
});


interface MenuContextProviderProps {
  children: ReactNode;
}

const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <MenuContexts.Provider value={{ open, toggle }}>
      {children}
    </MenuContexts.Provider>
  );
};

export default MenuContextProvider;