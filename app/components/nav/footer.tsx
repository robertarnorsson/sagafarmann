import { SiFacebook, SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";
import { Link } from "@remix-run/react";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-primary border-t border-border py-8">
      <div className="container px-4 lg:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Saga Farmann</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Embark on an unforgettable journey with Saga Farmann. Explore the world, discover new horizons, and make memories that last a lifetime.
            </p>
          </div>
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/tours" className="text-sm hover:underline">
                Tours
              </Link>
              <Link to="/sponsors" className="text-sm hover:underline">
                Sponsors
              </Link>
              <Link to="/about" className="text-sm hover:underline">
                About Us
              </Link>
              <Link to="/join" className="text-sm hover:underline">
                Join Us
              </Link>
            </nav>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex items-start text-muted-foreground space-x-2">
              <MapPin className="w-4 h-4" />
              <p className="text-sm">Vikingodden Ollebukta 3, 3126 Tønsberg</p>
            </div>
            <div className="flex items-start text-muted-foreground space-x-2 mt-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@sagafarmann.com" className="hover:underline text-sm">
                contact@sagafarmann.com
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 my-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition duration-300"
          >
            <SiFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition duration-300"
          >
            <SiInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition duration-300"
          >
            <SiYoutube />
          </a>
        </div>
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Saga Farmann. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made by{" "}
            <a
              href="https://robertarnorsson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary/80"
            >
              Robert Arnorsson
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
