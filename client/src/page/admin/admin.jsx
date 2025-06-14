import { Button } from "@/components/ui/button";
import useRequireAuth from "@/hooks/useRequireAuth";
import { useAppStore } from "@/Store";
import { HomeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
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
				<div className="flex w-2/3 items-center justify-items-center space-x-10">
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
							handleNavigate("orders");
						}}
						className="bg-[#0090ea] p-7 text-2xl"
					>
						Orders
					</Button>
				</div>
				<button
					onClick={() => {
						navigate("/");
					}}
					className="h-20 text-2xl"
				>
					<HomeIcon size={30} />
				</button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminPanel;
