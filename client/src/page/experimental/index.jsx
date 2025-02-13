import CreateProduct from "@/components/CreateProduct";
import DeleteProduct from "@/components/DeleteProduct";
import EditProduct from "@/components/EditProduct";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const ExperimentalUI = () => {
	const [menu, setMenu] = useState("");

	return (
		<div className="h-screen w-screen">
			<div className="flex w-full items-center justify-around">
				<h1 className="m-5 text-center text-3xl font-semibold">Admin page</h1>
				<div className="h-6 w-2/3 space-x-10">
					<Button
						onClick={() => {
							setMenu("create");
						}}
						className="bg-Maroon p-7 text-2xl"
					>
						Create Product
					</Button>
					<Button
						onClick={() => {
							setMenu("edit");
						}}
						className="bg-Maroon p-7 text-2xl"
					>
						Edit Product
					</Button>
					<Button
						onClick={() => {
							setMenu("delete");
						}}
						className="bg-Maroon p-7 text-2xl"
					>
						Delete Product
					</Button>
				</div>
			</div>
			<div>
				{menu === "create" && <CreateProduct />}
				{menu === "edit" && <EditProduct />}
				{menu === "delete" && <DeleteProduct />}
			</div>
		</div>
	);
};

export default ExperimentalUI;
