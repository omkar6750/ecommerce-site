import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation to the product detail page
import Item from '@/components/Item';
import apiClient from '@/lib/apiClient';
import { FETCH_PRODUCTS, HOST } from '@/Utils/constants';

const ShopCategory = ({ banner, category }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Send a POST request with filters in the JSON body
        const response = await apiClient.post(`${FETCH_PRODUCTS}?page=1`, {
          filters: { gender: category }
        });
        const data = await response.data
        console.log(response.data)
        // Assuming your backend returns { products: [...], total_pages: X }
        setProduct(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);
  if(!product){
    return(
      <div>No product data availeble</div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {banner && <img src={banner} alt="Banner" className="w-full" />}
      <h1 className="text-slate-900 font-semibold text-5xl mt-10">Shop Category</h1>
      <hr className="w-52 h-1 rounded-xl bg-[#252525]" />

      <div className="mt-12 flex gap-8 flex-wrap justify-center">
        {product.map((item, i) => (
          <Link to={`/product/${item.product_id}`} key={i} state={{ product: item }} >
            <Item
              id={item.product_id}
              name={item.name}
              size={item.size}
              tags={item.tags}
              gender={item.gender}
              colour={item.colour}
              old_price={item.old_price}
              new_price={item.new_price}
              product_image={item.product_image}
              description={item.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
