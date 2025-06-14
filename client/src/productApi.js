import apiClient from './lib/apiClient';
import { ORDER_ROUTE } from './Utils/constants';

export const fetchProducts = async (page = 1) => {
    const response = await apiClient.post(`/api/products?page=${page}`, {
        withCredentials: true, headers: { 'Content-Type': 'application/json' }
    });

    if (!response.data) {
        return { data: [], meta: {} };
    }
    return response.data;
};

export const updateProduct = async (updatedProduct) => {

    const response = await apiClient.patch(
        `/edit_product/${updatedProduct.product_id}`,
        updatedProduct,
        { withCredentials: true }
    );
    return response.data;
};

export const deleteProduct = async (deletedProduct) => {
    const response = await apiClient.delete(`/delete_product/${deletedProduct}`, {
        withCredentials: true,
    });
    return response.data;

}

export const getOrders = async (page = 1) => {
    const response = await apiClient.get(`${ORDER_ROUTE}?page=${page}`, {
        withCredentials: true,
    });

    if (!response.data) {
        return { data: [], meta: {} };
    }
    return response.data;
}

export const updateOrderStatus = async (order_status, orderId) => {
    const response = await apiClient.patch(`${ORDER_ROUTE}/${orderId}`, {
        order_status,
    }, {
        withCredentials: true,
    });
    return response.data;
}
