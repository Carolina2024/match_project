import Navbar from "../layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-16 px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
