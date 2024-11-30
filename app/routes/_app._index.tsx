import { Link, MetaFunction } from "@remix-run/react";
import { useEffect, useRef } from "react";
import TripsMapSidebar from "~/components/common/TripsMapSidebar";
import TripsMap from "~/components/map/TripsMap";
import { Button } from "~/components/ui/button";
import { MapProvider } from "~/context/MapContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann" },
    { name: "description", content: "Saga Farman follow the vikings" },
  ];
};

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current && videoOverlayRef.current) {
        const scrollY = window.scrollY;
        videoRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
        videoOverlayRef.current.style.backgroundColor = `hsl(var(--background) / ${Math.min(0.2 + scrollY / window.screen.height, 1)})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/assets/landing_page_video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div ref={videoOverlayRef} className="relative z-10 flex flex-col items-center justify-center h-full px-4 bg-background/20">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">
            Welcome to Saga Farmann
          </h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-md">
            Embark on an unforgettable journey with us.
          </p>
          <Link to='/join' prefetch="intent">
            <Button className="mt-12 w-64 h-11">
              Join Us
            </Button>
          </Link>
        </div>
      </div>
      <MapProvider>
        <div className="h-screen w-full flex justify-center items-center px-4">
          <div
            className="flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden w-full h-3/4 max-w-6xl"
          >
            <div className="flex-grow rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
              <TripsMap />
            </div>
            <TripsMapSidebar />
          </div>
        </div>
      </MapProvider>
    </div>
  );
}
