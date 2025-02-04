import data_product from '@/assets/Frontend_Assets/data';
import new_collections from '@/assets/Frontend_Assets/new_collections';
import Item from '@/components/Item';
import apiClient from '@/lib/apiClient';
import { FETCH_PRODUCTS } from '@/Utils/constants';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation to the product detail page

const ShopCategory = ({banner, category}) => {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await apiClient.get(FETCH_PRODUCTS + '?page=1');
        const data = await response.json(); // Parse the response JSON
        setProducts(data);
        
      };
  
      fetchProducts();
    } catch (error) {
      console.log(error)

    }
    setProducts(new_collections)

  }, []);
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <img src="" alt="" />
      <h1 className="text-slate-900 font-semibold text-5xl mt-10">Shop Category</h1>
      <hr className="w-52 h-1 rounded-xl bg-[#252525]" />

      <div className="mt-12 flex gap-8 flex-wrap justify-center">
        {products
          .filter(item => item.gender === category) 
          .map((item, i) => (
            <Link to={`/product/${item.id}`} key={i}>
              <Item
                id={item.product_id}
                name={item.name}
                image={item.product_image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
