import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex bg-[url('../../public/images/spheres.png')] bg-cover bg-center bg-no-repeat">
      <main className="w-full px-11 py-7">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
