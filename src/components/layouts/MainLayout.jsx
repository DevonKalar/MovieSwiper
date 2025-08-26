import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
