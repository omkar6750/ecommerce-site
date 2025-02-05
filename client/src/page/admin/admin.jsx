import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminPanel = () => {
    const history = useHistory();

    const handleCreateProduct = () => {
        history.push('/admin/create');
    };

    const handleEditProduct = () => {
        history.push('/admin/edit');
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