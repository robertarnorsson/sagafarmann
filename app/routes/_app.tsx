import { Outlet, } from "@remix-run/react";
import Footer from "~/components/nav/footer";
import Header from "~/components/nav/header";

export default function AppLayout() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>   
  )
}