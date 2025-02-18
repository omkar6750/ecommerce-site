import React from "react";
import Item from "./Item";
import { Link } from "react-router-dom";

const Popular = ({ popular }) => {
	const data = popular.filter((item) => item.gender === "female").slice(0, 4);
	return (
		<div className="relative flex h-full w-full flex-col items-center justify-center">
			<div className="absolute top-20 flex flex-col items-center justify-center">
				<h1 className="mt-10 text-5xl font-semibold text-slate-900">POPULAR IN WOMEN'S</h1>
				<hr className="h-1 w-52 rounded-xl bg-[#252525]" />
			</div>
			<div className="mt-36 grid grid-cols-4 gap-8">
				{data.map((item, i) => {
					return (
						<Link to={`/product/${item.product_id}`} key={i} state={{ product: item }}>
							<Item
								key={i}
								id={item.product_id}
								name={item.name}
								image={item.product_image}
								new_price={item.new_price}
								old_price={item.old_price}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Popular;
