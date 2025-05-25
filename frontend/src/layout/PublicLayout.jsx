import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
