import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-backgroundLight">
      <Header />
      <div className="flex-1 py-10 overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
