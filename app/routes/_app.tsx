import { SiFacebook, SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";
import { Link, Outlet, } from "@remix-run/react";
import Footer from "~/components/nav/footer";
import Header from "~/components/nav/header";

export default function AppLayout() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="fixed h-min bottom-2 right-2 md:top-1/2 md:-translate-y-1/2 md:right-4 z-[49]">
        <div className="flex flex-col items-center justify-center gap-4 group">
          <Link
            to="https://www.facebook.com/VikingskipetSagaFarmann"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition duration-300 md:hover:-translate-x-1 md:hover:scale-110"
          >
            <SiFacebook className="w-5 h-5 md:w-8 md:h-8" />
          </Link>
          <Link
            to="https://www.instagram.com/original_vikings_of_norway/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition duration-300 md:hover:-translate-x-1 md:hover:scale-110"
          > 
            <SiInstagram className="w-5 h-5 md:w-8 md:h-8" />
          </Link>
          <Link
            to="https://www.youtube.com/channel/UCaPUAvRBw0i5ET79TMh2_MQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition duration-300 md:hover:-translate-x-1 md:hover:scale-110"
          >
            <SiYoutube className="w-5 h-5 md:w-8 md:h-8" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>   
  )
}