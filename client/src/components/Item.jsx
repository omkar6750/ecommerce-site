import { HOST } from "@/Utils/constants";
import React from "react";

const Item = (props) => {
	return (
		<div className="w-96 duration-300 hover:-translate-y-3 hover:translate-x-3">
			<img src={`${HOST}/uploads/${props.image}`} alt="" className="object-cover" />
			<p>
				{props.gender === "male" ? "Mens" : props.gender === "female" ? "Womens" : "Kids"}
			</p>
			<p className="mt-3 text-xl font-medium">{props.name}</p>
			<div className="my-5 flex gap-3">
				<div className="text-xl font-semibold text-slate-800">{`Rs. ${props.new_price}`}</div>
				<div className="text-xl font-medium text-slate-800 line-through">
					{props.old_price}
				</div>
			</div>
		</div>
	);
};

export default Item;
