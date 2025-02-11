import { Button } from '@/components/ui/button';
import apiClient from '@/lib/apiClient';
import { DELETE_PRODUCT } from '@/Utils/constants';
import React, { useState } from 'react'
import { toast } from 'sonner';

const DeleteProduct = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const deleteProduct = async () => {
        if (!searchTerm) return;
        try {
            const response = await apiClient.delete(DELETE_PRODUCT,{data: { product_id: searchTerm },}
            )
            if (response.status === 200) {
                toast.success("Product deleted successfully")                
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    return (
        <div className='flex justify-center items-center w-full'>
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
                    <Button onClick={deleteProduct} className="p-3 text-lg font-medium h-10">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct