import { useState, useRef } from "react";
import axios from "axios";
import apiClient from "@/lib/apiClient";
import { CREATE_PRODUCT, UPLOAD_IMAGE } from "@/Utils/constants";
import { toast } from "sonner";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [tags, setTags] = useState("");
  const [gender, setGender] = useState("");
  const [colour, setColour] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Step 1: Create Product (without image)
      const productData = {
        name,
        size,
        tags,
        gender,
        colour,
        old_price: oldPrice,
        new_price: newPrice,
        description,
        product_image: "", // Initially empty, image will be uploaded later
      };
      console.log(productData)

      const productResponse = await apiClient.post(
        CREATE_PRODUCT,
        productData,
      );

      const productId = productResponse.data.product.id;

      // Step 2: Upload Image (if selected)
      if (image) {
        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("file", image);

        const response = await apiClient.post(UPLOAD_IMAGE, formData,{withCredentials: true}, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },},
        );
        if(response.status === 201){
          toast.success('product created successfully')
        }
        
      }

      alert("Product created successfully!");
      setName("");
      setSize("");
      setTags("");
      setGender("");
      setColour("");
      setOldPrice("");
      setNewPrice("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to create product.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Colour"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Old Price"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="New Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>

          {/* Invisible File Input */}
          <button
            type="button"
            onClick={handleAttachmentClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Attach Image
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
            {uploading ? "Uploading..." : "Create Product"}
          </button>
        </form>
    </div>
  );
};

export default CreateProduct;
