import React, { Children } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./page/auth";
import Shop from "./page/home";
import Cart from "./page/cart";
import ProductCard from "./page/product";
import { useAppStore } from "./Store";
import Profile from "./page/profile";
import Layout from "./page/layout";
import AdminPanel from "./page/admin/admin";
import CreateProduct from "./page/admin/createProduct.jsx";
import EditProduct from "./page/admin/editProduct.jsx";
import DeleteProduct from "./page/admin/deleteProduct";
import ExperimentalUI from "./page/experimental";
import MensPage from "./page/home/men";
import WomensPage from "./page/home/women";
import KidsPage from "./page/home/kids";

function App() {
	const AdminRoute = ({ children }) => {
		const { userInfo } = useAppStore();
		const isAdmin = userInfo && userInfo.is_admin;
		return isAdmin ? children : <Navigate to="/" />;
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Layout />}>
					<Route index element={<Shop />} />
					<Route path={"/experimental"} element={<ExperimentalUI />} />
					<Route path={"/auth"} element={<Auth />} />
					<Route path={"/mens"} element={<MensPage />} />
					<Route path={"/womens"} element={<WomensPage />} />
					<Route path={"/kids"} element={<KidsPage />} />
					<Route path={"/product"} element={<ProductCard />}>
						<Route path={":productId"} element={<ProductCard />} />
					</Route>
					<Route path={"/cart"} element={<Cart />} />
					<Route path={"/profile"} element={<Profile />} />

					<Route path="/admin" element={<AdminPanel />}>
						<Route path="create" element={<CreateProduct />} />
						<Route path="edit" element={<EditProduct />} />
						<Route path="delete" element={<DeleteProduct />} />
					</Route>
					<Route path="*" element={<Navigate to="/" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
