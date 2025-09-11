import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { AiChat } from "../features/AiChat";

const MainLayout = () => {
  return (
    <>
      <Header />
      <AiChat />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
