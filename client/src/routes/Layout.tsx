import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export const Layout = () => (
  <main className="w-full h-full">
    <Navbar />
    <hr />
    <Outlet />
  </main>
);
