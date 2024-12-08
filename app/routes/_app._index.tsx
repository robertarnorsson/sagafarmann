import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ExplorationGrid from "~/components/common/ExplorationGrid";
import { FlipWords } from "~/components/common/FlipWords";
import SosialMediaCard from "~/components/common/SosialMediaCard";
import TripsMapSidebar from "~/components/common/TripsMapSidebar";
import TripsMap from "~/components/map/TripsMap";
import { Button } from "~/components/ui/button";
import { MapProvider } from "~/context/MapContext";
import { SosialMedia, Stage, Trip, Waypoint } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann" },
    { name: "description", content: "Saga Farmann: Follow the Vikings" },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const API_URL = context.cloudflare.env.API_URL;

  const tripsUrl = `${API_URL}/trips`;
  const stagesUrl = `${API_URL}/stages`;
  const waypointsUrl = `${API_URL}/waypoints`;
  const sosialmediaUrl = `${API_URL}/sosialmedia?count=3`;

  const headers = {
    Authorization: `Bearer ${context.cloudflare.env.API_TOKEN}`,
  };

  const [tripsResponse, stagesResponse, waypointsResponse, sosialmediaResponse] = await Promise.all([
    fetch(tripsUrl, { headers }),
    fetch(stagesUrl, { headers }),
    fetch(waypointsUrl, { headers }),
    fetch(sosialmediaUrl, { headers }),
  ]);

  if (!tripsResponse.ok || !stagesResponse.ok || !waypointsResponse.ok || !sosialmediaResponse.ok) {
    throw new Response("Failed to load data", { status: 500 });
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

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", "140%"]);

  const videoBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], ["100%", "110%"]);
  
  const overlayScale = useTransform(scrollYProgress, [0, 1], ["100%", "70%"]);

  const words = ["unforgettable", "amazing", "surreal", "memorable", "inspiring", "breathtaking"];

  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: videoY, filter: videoBlur ,scale: videoScale }}
          aria-hidden="true"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-label="Background Video"
          >
            <source src="/assets/videos/landing_page_video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Overlay Content */}
        <div className="relative z-10 felx items-center justify-center h-full bg-black/30">
          <motion.div className="flex flex-col items-center justify-center text-center h-full" style={{ y: overlayY, scale: overlayScale }} layout>
            <motion.h1
              layout
              className="text-2xl md:text-5xl font-bold text-white inline-block transition-transform duration-500"
            >
              Experience the <FlipWords words={words} />
              <br />
              adventures with Saga Farmann.
            </motion.h1>
            <Link to="/join" prefetch="intent" aria-label="Join Us">
              <Button className="mt-12 w-64 h-11">Join Us</Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full mt-12 px-6 md:px-12">
        <section className="container w-full py-12">
          <ExplorationGrid />
        </section>
        <section className="container w-full py-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            Social Media Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sosialmedia.map((post) => (
              <SosialMediaCard
                key={post.id}
                title={post.title}
                description={post.description}
                image={post.image}
                url={post.url}
              />
            ))}
          </div>
        </section>
        <section className="container w-full py-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            See Where We Have Been and Where We Are Going
          </h2>
          <MapProvider>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 w-full h-full">
              <div className="w-full h-64 md:h-[75vh] md:w-2/3 rounded-lg overflow-hidden">
                <TripsMap />
              </div>
              <div className="w-full h-1/3 md:h-[75vh] md:w-1/3">
              <TripsMapSidebar trips={trips} stages={stages} waypoints={waypoints} />
            </div>
            </div>
          </MapProvider>
        </section>
      </main>
    </div>
  );
}
