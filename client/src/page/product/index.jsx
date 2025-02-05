import { useAppStore } from "@/Store";
import React from "react";

const ProductCard = ({ product }) => {
    const { addToCart } = useAppStore(state => state);

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 w-64">
            {/* <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-md"
            /> */}
            {/* <div className="mt-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
                <button 
                    onClick={() => addToCart(product)} 
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                >
                    Add to Cart
                </button>
            </div> */}
            work in progress
        </div>
    );
};

export default ProductCard;
