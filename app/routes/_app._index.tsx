import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const API_URL = context.cloudflare.env.API_URL

  const tripsUrl = `${API_URL}/trips`;
  const stagesUrl = `${API_URL}/stages`;
  const waypointsUrl = `${API_URL}/waypoints`;
  const sosialmediaUrl = `${API_URL}/sosialmedia?count=3`;

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

  const paralaxRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: paralaxRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  return (
    <div className="flex flex-col">
      <div
        ref={paralaxRef}
        className="relative h-screen overflow-hidden"
        aria-label="Parallax Background Section"
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: videoY }}
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
            <source src="/assets/landing_page_video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 bg-background/20">
          <motion.div className="text-center" style={{ y: overlayY }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md">
              Welcome to Saga Farmann
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white drop-shadow-md">
              Embark on an unforgettable journey with us.
            </p>
            <Link to="/join" prefetch="intent" aria-label="Join Us">
              <Button className="mt-12 w-64 h-11">Join Us</Button>
            </Link>
          </motion.div>
        </div>
      </div>
      <main className="flex flex-col items-center w-full">
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
              <div className="h-64 md:h-[75vh]">
                <TripsMapSidebar trips={trips} stages={stages} waypoints={waypoints} />
              </div>
            </div>
          </MapProvider>
        </section>
      </main>
    </div>
  );
}