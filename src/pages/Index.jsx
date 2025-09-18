import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { AiChat } from "@components/AiChat";

const MainLayout = () => {
  return (
    <>
      <Header />
      <AiChat />
      <main className="flex-1 overflow-hidden py-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
