import React from "react";
import Item from "./Item";

const Popular = ({ popular }) => {
	const data = popular.filter((item) => item.gender === "female").slice(0, 6);
	return (
		<div className="flex h-5/6 w-screen flex-col items-center gap-3">
			<h1 className="mt-10 text-5xl font-semibold text-slate-900">POPULAR IN WOMEN'S</h1>
			<hr className="h-1 w-52 rounded-xl bg-[#252525]" />
			<div className="mt-12 grid grid-cols-3 gap-8">
				{data.map((item, i) => {
					return (
						<Item
							key={i}
							id={item.product_id}
							name={item.name}
							image={item.product_image}
							new_price={item.new_price}
							old_price={item.old_price}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Popular;
