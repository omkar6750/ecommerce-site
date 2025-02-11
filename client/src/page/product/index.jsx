import React, { useEffect, useState } from "react";
import { useAppStore } from "@/Store";
import { useLocation } from "react-router-dom";
import { HOST } from "@/Utils/constants";
import { ArrowLeftRight, BanknoteIcon, Truck } from "lucide-react";
import { toast } from "sonner";



const ProductCard = () => {
    const location = useLocation();
    const { addToCart, cart } = useAppStore((state) => state);
    const { product } = location.state || {};
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedProduct, setSelectedProduct] = useState()


    useEffect(() => {
      setSelectedProduct(product)
    
    }, [])
    console.log(cart)
    const handleAddToCart = () => {
        addToCart(selectedProduct)
        toast.success("Added to cart successfully")
    }
    
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);
    const formattedDate = futureDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
      });

    const testSize = 'M,L,XL,XXl'
    
    const sizeArray = testSize.split(",").map(size => size.trim());
     

    if (!product) {
        return <div>No product data available.</div>;
    }

    
    
    return (
        <div className="container mx-auto p-20 space-x-12 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 flex justify-center items-center">     
                <div className="border-2">
                    <div className="lg:h-[550px] lg:w-[400px] md:h-[480px] md:w-[370px] h-[420px] w-[330px] overflow-hidden rounded-lg m-5">
                        <img
                        src={`${HOST}/uploads/${product.product_image}`}
                        className="h-full w-full object-cover  rounded-md"
                        />
                    </div>
                </div>
            </div>
            
            {/* Right: Product Details */}
            <div className="md:w-2/5 flex flex-col justify-start">
                <h1 className="text-4xl font-bold mb-4 text-slate-800/90">{product.name}</h1>
                <p className="text-gray-600 mb-4 text-lg ">{product.description}</p>
                
                <div className="mb-4">
                    <span className="text-2xl font-semibold mr-4">
                        ₹{product.new_price}
                    </span>
                    {product.old_price && product.new_price < product.old_price  && (
                        <>
                            <span className="text-gray-500 line-through text-lg">
                                ₹{product.old_price}
                            </span>
                            <p className="text-red-500 font-bold text">
                                {`(${Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}% OFF)`}
                            </p>
                        </>
                    )}
                    <p className="text-green-600">inclusive of all taxes</p>
                </div>
                <div className="font-semibold text-lg">Select Size:</div>
                <div className="mb-2">
                    <ul className="flex space-x-4">
                        {sizeArray.map((size, index) => (
                        <li 
                        key={index} 
                        onClick={(e) => {setSelectedProduct({...selectedProduct, 'size': size})
                        setSelectedSize(size)}
                        } 
                        className={`rounded-full border text-2xl w-14 h-14 flex items-center justify-center cursor-pointer ${selectedSize===size?'bg-accent':'' } `}>{size}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-2">
                <strong>Tags:</strong> {product.tags}
                </div>
                <div className="mb-2">
                <strong>Colour:</strong> {product.colour}
                </div>
                <div className="mb-2">
                <strong>Gender:</strong> {product.gender}
                </div>
                
                <button
                onClick={handleAddToCart}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                Add to Cart
                </button>
                <div className="flex gap-5 pt-11 pb-2">
                    <ArrowLeftRight /> <p>Easy 7 day return/exchange available</p>
                </div>
                <div className="flex gap-5 pb-2">
                    <BanknoteIcon />  <p>Cash on delivery Not available</p>
                </div>
                <div className="flex gap-5">
                    <Truck /> 
                    <div className="flex ">
                        <p>Get it by</p> <p className="font-medium  px-2">{formattedDate}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;
