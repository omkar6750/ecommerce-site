import React, { Children, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./page/auth";
import Shop from "./page/home";
import Cart from "./page/cart";
import ProductCard from "./page/product/clothes";
import { useAppStore } from "./Store";
import Layout from "./page/layout";
import AdminPanel from "./page/admin/admin";
import CreateProduct from "./page/admin/createProduct.jsx";
import EditProduct from "./page/admin/editProduct.jsx";
import ExperimentalUI from "./page/experimental";
import MensPage from "./page/home/men";
import WomensPage from "./page/home/women";
import KidsPage from "./page/home/kids";
import ShopCategory from "./page/shopCategory";
import Electronics from "./page/home/Electronics";
import ElectronicsShop from "./page/shopCategory/Electronics";
import { USER_ROUTE } from "./Utils/constants";
import OrderDashboard from "./page/admin/Orders";
import UserOrders from "./page/OrderHistory";
import useRequireAuth from "./hooks/useRequireAuth";

function App() {
	const { userInfo, isLoading, fetchUser } = useAppStore();

	const AdminRoute = ({ children }) => {
		if (isLoading) return <div>Loading...</div>;

		return userInfo.is_admin ? children : <Navigate to="/auth" />;
	};

	useEffect(() => {
		const userData = async () => {
			const response = await fetchUser();
		};
		userData();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Layout />}>
					<Route index element={<Shop />} />
					<Route path={"/experimental"} element={<ExperimentalUI />} />
					<Route path={"/auth"} element={<Auth />} />
					<Route path={"/men"} element={<MensPage />} />
					<Route path={"/women"} element={<WomensPage />} />
					<Route path={"/kids"} element={<KidsPage />} />
					<Route path={"/electronics"} element={<Electronics />} />
					<Route path={`/shop/men/:page?`} element={<ShopCategory category={"male"} />} />
					<Route
						path={`/shop/women/:page?`}
						element={<ShopCategory category={"female"} />}
					/>
					<Route path={`/shop/kids/:page?`} element={<ShopCategory category={"kid"} />} />
					<Route path={`/shop/electronics/:page?`} element={<ElectronicsShop />} />

					<Route path={"/product"} element={<ProductCard />}>
						<Route path={":productId"} element={<ProductCard />} />
					</Route>
					<Route
						path={"/cart"}
						element={userInfo.email ? <Cart /> : <Navigate to="/auth" replace />}
					/>
					<Route
						path={"/orders"}
						element={userInfo.email ? <UserOrders /> : <Navigate to="/auth" replace />}
					/>

					<Route
						path="/admin"
						element={
							<AdminRoute>
								<AdminPanel />
							</AdminRoute>
						}
					>
						<Route
							path="create"
							element={
								<AdminRoute>
									<CreateProduct />
								</AdminRoute>
							}
						/>
						<Route
							path="edit"
							element={
								<AdminRoute>
									<EditProduct />
								</AdminRoute>
							}
						/>
						<Route
							path="orders"
							element={
								<AdminRoute>
									<OrderDashboard />
								</AdminRoute>
							}
						/>
					</Route>
					<Route path="*" element={<Navigate to="/" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
