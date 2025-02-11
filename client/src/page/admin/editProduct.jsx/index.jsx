import React, { useRef, useState } from "react";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { EDIT_PRODUCT, FETCH_SINGLE_PRODUCT, UPLOAD_IMAGE } from "@/Utils/constants";

const ProductCard = () => {
    const [uploading, setUploading] = useState(false);
    const [detailsReceived, setDetailsReceived] = useState(false);
    const [image, setImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [product, setProduct] = useState(null);
    
    const fileInputRef = useRef(null);

    const handleAttachmentClick = () => fileInputRef.current?.click();
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const searchProduct = async () => {
        if (!searchTerm) return;
        try {
            const response = await apiClient.get(`${FETCH_SINGLE_PRODUCT}/${searchTerm}`);
            if (response.status === 200) {
                setProduct(response.data);
                setDetailsReceived(true);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const editProduct = async (e) => {
        e.preventDefault();
        if (!product) return;
        setUploading(true);
        try {
            await apiClient.put(EDIT_PRODUCT, product);
            if (image) {
                const formData = new FormData();
                formData.append("productId", product.product_id);
                formData.append("file", image);
                await apiClient.post(UPLOAD_IMAGE, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            alert("Product updated successfully!");
            setProduct(null);
            setDetailsReceived(false);
            setImage(null);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update product.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-2/3 h-[70vh]">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-16 border-t border-gray-200">
                {detailsReceived ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
                        <form onSubmit={editProduct} className="space-y-4">
                            {Object.keys(product).map((key) => (
                                key !== "product_id" && key !== "product_image" && (
                                    <input
                                        key={key}
                                        type={typeof product[key] === "number" ? "number" : "text"}
                                        placeholder={key.replace("_", " ").toUpperCase()}
                                        value={product[key] || ""}
                                        onChange={(e) => setProduct({ ...product, [key]: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                )
                            ))}
                            <button
                                type="button"
                                onClick={handleAttachmentClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Attach New Image
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {image && <p className="text-gray-600">Selected: {image.name}</p>}
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full py-2 bg-green-500 text-white rounded-lg"
                            >
                                {uploading ? "Uploading..." : "Edit Product"}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex items-center justify-center flex-col w-[40vh]">
                        <h2 className="text-2xl font-semibold mb-4">Enter Product ID</h2>
                        <div className="w-full flex">
                            <input 
                                type="text" 
                                className="border w-full p-2 rounded" 
                                placeholder="Product ID"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button onClick={searchProduct} className="p-3 text-lg font-medium h-10">
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
