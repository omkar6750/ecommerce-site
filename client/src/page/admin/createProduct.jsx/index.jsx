import apiClient from '@/lib/apiClient';
import { CREATE_PRODUCT, UPLOAD_IMAGE } from '@/Utils/constants';
import React, { useState } from 'react';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [productForm, setProductForm] = useState({})

    const handleAttactmentClick = (e) => {
      if(fileInputRef.current){
        fileInputRef.current.click();
      }
    }

    const handleFileChange = (e) => {
      const checkIfImage = (filePath) => {
        const imageRegex = /\.(jpeg|jpg|gif|png|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
        return imageRegex.test(filePath);
      }
      const file = e.target.files[0]
      if(file ){
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        try {
          const response = await apiClient.post(CREATE_PRODUCT, productForm)
          const product_id = response.data.product.id
        } catch (error) {
          console.log(error) 
        }

        try {
            const response = await apiClient.post(UPLOAD_IMAGE, formData,);
            console.log('Product created:', response.data);
          
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            <div>
              <h2 className="text-4xl">Admin Panel</h2>
              <div className="grid grid-cols-3 gap-4">
                  <input type="text" name="name" placeholder="Product Name" value={productForm.name} onChange={handleChange} />
                  <input type="text" name="size" placeholder="Size" value={productForm.size} onChange={handleChange} />
                  <input type="text" name="tags" placeholder="Tags (comma-separated)" value={productForm.tags} onChange={handleChange} />
                  <input type="text" name="gender" placeholder="Gender" value={productForm.gender} onChange={handleChange} />
                  <input type="text" name="colour" placeholder="Colour" value={productForm.colour} onChange={handleChange} />
                  <input type="number" name="old_price" placeholder="Old Price" value={productForm.old_price} onChange={handleChange} />
                  <input type="number" name="new_price" placeholder="New Price" value={productForm.new_price} onChange={handleChange} />
                  
                  <button onClick={handleAttactmentClick}>Attach Image</button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                  
                  <textarea name="description" placeholder="Description" value={productForm.description} onChange={handleChange}></textarea>
                  
                  <button onClick={handleSubmit}>Submit</button>
              </div>
          </div>
        </div>
    );
};

export default CreateProduct;