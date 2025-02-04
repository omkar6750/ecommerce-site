import React, { useState, useEffect } from "react";
import apiClient from "@/lib/apiClient"; // Import Axios client
import {CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FETCH_PRODUCTS } from "@/Utils/constants"; // Import API routes
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    size: "",
    tags: "",
    gender: "",
    colour: "",
    old_price: "",
    new_price: "",
    product_image: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get(FETCH_PRODUCTS + "?page=1");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // Handle product creation
  const handleCreateProduct = async () => {
    try {
      await apiClient.post(CREATE_PRODUCT, productForm);
      alert("Product Created");
      window.location.reload(); // Refresh page
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Handle product update
  const handleEditProduct = async () => {
    if (!editingProduct) return;
    try {
      await apiClient.put(EDIT_PRODUCT, { ...productForm, product_id: editingProduct.id });
      alert("Product Updated");
      window.location.reload();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await apiClient.delete(DELETE_PRODUCT, { data: { product_id: productId } });
      alert("Product Deleted");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-8xl">Admin Panel</h2>

      {/* Product Form */}
      <div className="flex  items-center justify-around flex-col ">
        <div className="grid grid-cols-3 gap-10">
            <input className="text-2xl border-2 rounded-sm" type="text" name="name" placeholder="Product Name" value={productForm.name} onChange={handleChange} />
            <input className="text-2xl border-2 rounded-sm" type="text" name="size" placeholder="Size" value={productForm.size} onChange={handleChange} />
            <input className="text-2xl border-2 rounded-sm" type="text" name="tags" placeholder="Tags (comma-separated)" value={productForm.tags} onChange={handleChange} />
            <input className="text-2xl border-2 rounded-sm" type="text" name="gender" placeholder="Gender" value={productForm.gender} onChange={handleChange} />
            <input className="text-2xl border-2 rounded-sm" type="text" name="colour" placeholder="Colour" value={productForm.colour} onChange={handleChange} />
            <input className="text-2xl border-2 rounded-sm" type="number" name="old_price" placeholder="Old Price" value={productForm.old_price} onChange={handleChange} />
            <input className="text-2xl border-2 rounded-sm" type="number" name="new_price" placeholder="New Price" value={productForm.new_price} onChange={handleChange} />
            <input className="text-2xl border-2 rounded-sm" type="text" name="product_image" placeholder="Image URL" value={productForm.product_image} onChange={handleChange} />
            <textarea className="text-2xl border-2 rounded-sm" name="description" placeholder="Description" value={productForm.description} onChange={handleChange}></textarea>
        </div>

        {/* Create or Update Button */}
        {editingProduct ? (
          <Button className="m-9 text-center" onClick={handleEditProduct}>Update Product</Button>
        ) : (
          <Button className="m-9 text-center" onClick={handleCreateProduct}>Create Product</Button>
        )}
      </div>

      {/* Product List */}
      <h3>Existing Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            {product.name} - {product.new_price}₹
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
