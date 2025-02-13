import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
	const location = useLocation();
	const hideNavbar =
		location.pathname.startsWith("/auth") ||
		location.pathname.startsWith("/admin") ||
		location.pathname.startsWith("/profile") ||
		location.pathname.startsWith("/admin/create-product") ||
		location.pathname.startsWith("/admin/edit-product") ||
		location.pathname.startsWith("/product") ||
		location.pathname.startsWith("/experimental");

	// Conditions to hide the Footer (but NOT for /product routes)
	const hideFooter =
		location.pathname.startsWith("/auth") ||
		location.pathname.startsWith("/admin") ||
		location.pathname.startsWith("/profile") ||
		location.pathname.startsWith("/admin/create-product") ||
		location.pathname.startsWith("/admin/edit-product");
	// location.pathname.startsWith("/experimental");

	return (
		<>
			<div className="relative">
				{!hideNavbar && <Navbar />}
				<Outlet className="absolute" />
				{/* {!hideFooter && <Footer />} */}
			</div>
		</>
	);
};

export default Layout;
