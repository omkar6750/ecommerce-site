import { HOST } from "@/Utils/constants";
import React from "react";

const Item = (props) => {
	console.log(props);
	return (
		<div className="w-96 duration-300 hover:-translate-y-3 hover:translate-x-3">
			<img src={`${HOST}/uploads/${props.image}`} alt="" className="object-cover" />
			<p className="mt-2">{props.name}</p>
			<div className="flex gap-5">
				<div className="text-xl font-semibold text-slate-800">{props.new_price}</div>
				<div className="text-xl font-medium text-slate-800 line-through">
					{props.old_price}
				</div>
			</div>
		</div>
	);
};

export default Item;
