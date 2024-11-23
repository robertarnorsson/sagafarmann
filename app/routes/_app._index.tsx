import { useEffect, useRef } from "react";

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
          <source src="/assets/full_hd.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div ref={videoOverlayRef} className="relative z-10 flex flex-col items-center justify-center h-full px-4 bg-background/20">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">
            Welcome to Saga Farmann
          </h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-md">
            Embark on an unforgettable journey with us.
          </p>
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
