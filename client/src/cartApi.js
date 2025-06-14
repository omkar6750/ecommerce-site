import { toast } from "sonner";
import apiClient from "./lib/apiClient";
import { CART_ROUTE, CHECKOUT_ROUTE } from "./Utils/constants";
import { useNavigate } from "react-router-dom";

export const addToCart = async (product_id, quantity, variant_sku) => {
    const response = await apiClient.post(`${CART_ROUTE}`, { product_id, variant_sku, quantity }, { withCredentials: true });
    return response.data;
};

export const getCart = async () => {
    try {
        const response = await apiClient.get(`${CART_ROUTE}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        return error
    }



};


export const clearCart = async () => {
    const response = await apiClient.delete(`${CART_ROUTE}`, { withCredentials: true });
    return response.data;
};

export const removeCartItem = async (cartItemId, quantity) => {
    const response = await apiClient.delete(`${CART_ROUTE}/${cartItemId}${quantity ? `?quantity=${quantity}` : ""}`, { withCredentials: true });
    return response.data;
};

export const cartCheckout = async () => {
    try {
        const response = await apiClient.post(`${CHECKOUT_ROUTE}`, {}, {
            withCredentials: true,

        });
        return response.data;
    } catch (error) {
    }

}