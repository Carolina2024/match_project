import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [activeView, setActiveView] = useState("Mascotas");
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="pl-64 w-full flex flex-col">
        <AdminNavbar
          sectionTitle={activeView}
          isSidebarVisible={isSidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <main className="p-6 flex-1">
          <Outlet context={{ activeView, setActiveView }} />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
