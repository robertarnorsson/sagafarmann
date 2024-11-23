import { Sheet, SheetClose, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "@remix-run/react";
import { links } from "~/lib/constants/links";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 h-14 bg-transparent flex justify-center items-center backdrop-blur-sm z-40">
      <div className="container px-4 lg:px-6 flex items-center">
        <Link className="flex items-center justify-center" to="/" prefetch="render">
          <span className="ml-2 text-2xl font-bold font-archivo text-white">Saga Farmann</span>
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
              <Menu className="h-5 w-5 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            closeButton={false}
            aria-describedby=""
            className="z-50 bg-background/20 backdrop-blur-sm border-none"
          >
            <nav className="grid gap-4 text-lg font-medium">
              <SheetClose className="absolute right-4 top-4">
                <div className="p-3 cursor-pointer">
                  <X className="w-5 h-5 text-white" />
                  <span className="sr-only">Close</span>
                </div>
              </SheetClose>
              <div className="flex flex-row justify-between gap-2">
                <SheetClose asChild>
                  <Link className="flex items-center" to="/" prefetch="render">
                    <span className="text-3xl font-bold font-archivo text-white">Saga Farmann</span>
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
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
