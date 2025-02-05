import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate()

    const handleCreateProduct = () => {
        navigate('/admin/create');
    };

    const handleEditProduct = () => {
        navigate('/admin/edit');
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <button onClick={handleCreateProduct}>Create Product</button>
            <button onClick={handleEditProduct}>Edit Product</button>
        </div>
    );
};

export default AdminPanel;