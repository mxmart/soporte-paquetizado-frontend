import { useState, useCallback } from "react";

const useToggle = (initialState: boolean = false):{ isOpen: boolean, toggle: () => any } => {

  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => setIsOpen((prevState) => !prevState), []);

  return {
    isOpen,
    toggle,
  };
};
export default useToggle;
