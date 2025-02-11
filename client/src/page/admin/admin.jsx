import Item from '@/components/Item';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate()
    const [editProduct, setEditProduct] = useState()

    const handleCreateProduct = () => {
        navigate('/admin/create-product');
    };

    const handleEditProduct = () => {
        navigate('/admin/edit-product');
        setEditProduct(true)
    };

    const handleDeleteProduct =() => {
        navigate('/admin/delete-product')
    }
    return (
        <div>
            <h1 className='text-8xl font-bold text-slate-900 text-center m-14 '>Admin Panel</h1>
            <hr />
            <div className='flex h-[70vh]  items-center justify-between gap-6'>
                <div className='flex flex-col gap-16 items-center justify-center w-1/3 '>
                    <Button className="text-white bg-amber-600 text-4xl p-10 rounded-lg w-96" onClick={handleCreateProduct}>Create Product</Button>
                    <Button className="text-white bg-amber-600 text-4xl p-10 rounded-lg w-96" onClick={handleEditProduct}>Edit Product</Button>
                    <Button className="text-white bg-amber-600 text-4xl p-10 rounded-lg w-96" onClick={handleDeleteProduct}>Delete Product</Button>
                </div>
                <Outlet />
            </div> 
        </div>
    );
};

export default AdminPanel;