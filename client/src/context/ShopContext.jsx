import { createContext, useState } from "react";

export const ShopContext = createContext();

function ShopContextProvider({ children }) {
  const [state, setState] = useState({});

  return (
    <ShopContext.Provider value={{ state, setState }}>
      {children} {/* Ensure children is being passed correctly */}
    </ShopContext.Provider>
  );
}
export default ShopContextProvider