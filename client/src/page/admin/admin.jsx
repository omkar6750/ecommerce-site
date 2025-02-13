import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
	const navigate = useNavigate();
	const handleNavigate = (url) => {
		navigate(`/admin/${url}`);
	};

	return (
		<div className="h-screen w-full">
			<div className="flex w-full items-center justify-around">
				<h1 className="m-5 text-center text-3xl font-semibold">Admin page</h1>
				<div className="w-2/3 space-x-10">
					<Button
						onClick={() => {
							handleNavigate("create");
						}}
						className="bg-[#0090ea] p-7 text-2xl"
					>
						Create Product
					</Button>
					<Button
						onClick={() => {
							handleNavigate("edit");
						}}
						className="bg-[#0090ea] p-7 text-2xl"
					>
						Edit Product
					</Button>
					<Button
						onClick={() => {
							handleNavigate("delete");
						}}
						className="bg-[#0090ea] p-7 text-2xl"
					>
						Delete Product
					</Button>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminPanel;
