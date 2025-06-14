import apiClient from "@/lib/apiClient";
import { CART_ROUTE } from "@/Utils/constants";
import e from "cors";
import { data, useNavigate } from "react-router-dom";

export const createCartSlice = (set) => ({
    cart: [],


    fetchCart: async () => {

        try {
            const response = await apiClient.get(CART_ROUTE, { withCredentials: true });
            if (response.status === 200) {
                set({ cart: response.data.items });

            }
        } catch (error) {
            if (error.response.status === 401) {
            }

        }
    },
});


