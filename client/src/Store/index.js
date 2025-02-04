import { create } from "zustand";
import { createAuthSlice } from "./slice/auth-slice";
import { createCartSlice } from "./slice/cart-slice";

export const useAppStore = create()((...a) =>({
    ...createAuthSlice(...a),
    ...createCartSlice(...a),
}));

