import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import SosialMediaCard from "~/components/common/SosialMediaCard";
import TripsMapSidebar from "~/components/common/TripsMapSidebar";
import TripsMap from "~/components/map/TripsMap";
import { Button } from "~/components/ui/button";
import { MapProvider } from "~/context/MapContext";
import { SosialMedia, Stage, Trip, Waypoint } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann" },
    { name: "description", content: "Saga Farman follow the vikings" },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const tripsUrl = "https://sagafarmann-api.patient-lab-9126.workers.dev/trips";
  const stagesUrl = "https://sagafarmann-api.patient-lab-9126.workers.dev/stages";
  const waypointsUrl = "https://sagafarmann-api.patient-lab-9126.workers.dev/waypoints";
  const sosialmediaUrl = "https://sagafarmann-api.patient-lab-9126.workers.dev/sosialmedia";

  const headers = {
    'Authorization': `Bearer ${context.cloudflare.env.API_TOKEN}`
  }

  const [tripsResponse, stagesResponse, waypointsResponse, sosialmediaResponse] = await Promise.all([
    fetch(tripsUrl, { headers }),
    fetch(stagesUrl, { headers }),
    fetch(waypointsUrl, { headers }),
    fetch(sosialmediaUrl, { headers }),
  ]);

  if (!tripsResponse.ok) {
    throw new Response("Failed to load trip data", { status: tripsResponse.status });
  }
  if (!stagesResponse.ok) {
    throw new Response("Failed to load stage data", { status: stagesResponse.status });
  }
  if (!waypointsResponse.ok) {
    throw new Response("Failed to load waypoint data", { status: waypointsResponse.status });
  }
  if (!sosialmediaResponse.ok) {
    throw new Response("Failed to load sosialmedia data", { status: sosialmediaResponse.status });
  }

  const [trips, stages, waypoints, sosialmedia] = await Promise.all([
    tripsResponse.json<Trip[]>(),
    stagesResponse.json<Stage[]>(),
    waypointsResponse.json<Waypoint[]>(),
    sosialmediaResponse.json<SosialMedia[]>(),
  ]);
  
  return { trips, stages, waypoints, sosialmedia };
}

export default function Index() {
  const { trips, stages, waypoints, sosialmedia } = useLoaderData<typeof loader>();
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
      <section>
        {sosialmedia.map((post, idx) => (
          <SosialMediaCard key={idx} title={post.title} description={post.description} image={post.image} url={post.url} />
        ))}
      </section>
      <MapProvider>
        <div className="h-screen w-full flex justify-center items-center px-4">
          <div
            className="flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden w-full h-3/4 max-w-6xl"
          >
            <div className="flex-grow h-2/3 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
              <TripsMap />
            </div>
            <div className="w-full h-1/3 md:h-full md:w-1/3">
              <TripsMapSidebar trips={trips} stages={stages} waypoints={waypoints} />
            </div>
          </div>
        </div>
      </MapProvider>
    </div>
  );
}
