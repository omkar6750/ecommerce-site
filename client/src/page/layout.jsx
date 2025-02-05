import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const hideNavbarFooter = ["/auth", "/admin", "/profile"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Outlet /> {/* This renders the child route components */}
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default Layout;
