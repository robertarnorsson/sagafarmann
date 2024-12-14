import { Sheet, SheetClose, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "@remix-run/react";
import { links } from "~/lib/links";
import { SiFacebook, SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 h-14 bg-transparent flex justify-center items-center backdrop-blur-sm z-40">
      <div className="container px-4 lg:px-6 flex items-center">
        <Link className="flex items-center justify-center" to="/" prefetch="render">
          <img src="/assets/images/logo/logo_single_256x256.png" alt="Saga Farmann logo" height={38} width={38} />
          <span className="ml-2 text-2xl font-bold font-sans text-white">Saga Farmann</span>
        </Link>
        <nav className="hidden sm:flex ml-auto gap-4 sm:gap-6 items-center text-white">
          {links.map((link, idx) =>
            link.action ? (
              <Link to={link.path} key={idx}>
                <Button>{link.name}</Button>
              </Link>
            ) : (
              <Link
                key={idx}
                className="group text-sm font-medium transform transition-transform duration-300"
                to={link.path}
                prefetch="intent"
              >
                <span className="fancy-underline hover:fancy-underline-hover">{link.name}</span>
              </Link>
            )
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 ml-auto sm:hidden hover:bg-accent/30 hover:text-accent-foreground/30"
            >
              <Menu strokeWidth={2} className="!h-5 !w-5 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            closeButton={false}
            aria-describedby=""
            className="z-50 bg-background/50 backdrop-blur-md border-none"
          >
            <nav className="grid gap-4 text-lg font-medium">
              <SheetClose className="absolute left-0 top-1/2 -translate-y-1/2">
                <div className="p-3 cursor-pointer">
                  <div className="h-12 w-1 rounded-full bg-foreground/30"></div>
                  <span className="sr-only">Close</span>
                </div>
              </SheetClose>
              <div className="flex flex-row justify-between gap-2">
                <SheetClose asChild>
                  <Link className="flex items-center" to="/" prefetch="render">
                    <img src="/assets/images/logo/logo_single_256x256.png" alt="Saga Farmann logo" height={38} width={38} />
                    <span className="text-2xl ml-2 font-bold font-archivo text-white">Saga Farmann</span>
                  </Link>
                </SheetClose>
              </div>
              <div className="flex flex-col space-y-6">
                {links.map((link, idx) =>
                  link.action ? (
                    <SheetClose asChild key={idx}>
                      <Link to={link.path}>
                        <Button className="w-full">{link.name}</Button>
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild key={idx}>
                      <Link
                        className="font-medium text-white hover:underline underline-offset-4"
                        to={link.path}
                        prefetch="render"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  )
                )}
                <div className="flex flex-row items-center justify-around w-full group">
                  <Link
                    to="https://www.facebook.com/VikingskipetSagaFarmann"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground bg-primary rounded-md p-2"
                  >
                    <SiFacebook className="w-6 h-6" />
                  </Link>
                  <Link
                    to="https://www.instagram.com/original_vikings_of_norway/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground bg-primary rounded-md p-2"
                  > 
                    <SiInstagram className="w-6 h-6" />
                  </Link>
                  <Link
                    to="https://www.youtube.com/channel/UCaPUAvRBw0i5ET79TMh2_MQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground bg-primary rounded-md p-2"
                  >
                    <SiYoutube className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
