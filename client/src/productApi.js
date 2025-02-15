// productApi.js
import apiClient from './lib/apiClient';

export const fetchProducts = async (page = 1) => {
    const response = await apiClient.post(`/api/products?page=${page}`, {
        withCredentials: true, headers: { 'Content-Type': 'application/json' }
    });
    console.log("Response data:", response.data); // Debug logging

    // If response.data is undefined, return a default object
    if (!response.data) {
        return { data: [], meta: {} };
    }
    return response.data;
};

export const updateProduct = async (updatedProduct) => {
    // Assuming your backend endpoint is PATCH /api/products/:product_id
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
