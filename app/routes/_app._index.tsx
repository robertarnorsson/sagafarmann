import { Link, MetaFunction } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";

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
      <div className="h-screen w-full">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold">More Content</h2>
        </div>
      </div>
    </div>
  );
}
