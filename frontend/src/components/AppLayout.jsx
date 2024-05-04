import ProtectRoute from "./ProtectRoute";
import Header from "./Header";
import SideNav from "./SideNav";

function AppLayout({ children }) {
  return (
    <div className="relative m-auto h-screen max-w-[1300px] bg-neutral-100">
      <Header />
      <SideNav />
      <main className="relative max-h-screen overflow-y-scroll pt-12 md:ml-36">
        <ProtectRoute>{children}</ProtectRoute>
      </main>
    </div>
  );
}

export default AppLayout;
