import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;