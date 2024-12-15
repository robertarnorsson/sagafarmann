import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Await, Link, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import ExplorationGrid from "~/components/common/ExplorationGrid";
import { FlipWords } from "~/components/common/FlipWords";
/* import { InfiniteMovingCards } from "~/components/common/InfiniteMovingCards"; */
import { SosialMediaCard, SosialMediaCardSkeleton } from "~/components/common/SosialMediaCard";
import TripsMapSidebar, { TripsMapSidebarSkeleton } from "~/components/common/TripsMapSidebar";
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

  const headers = {
    Authorization: `Bearer ${context.cloudflare.env.API_TOKEN}`,
  };

  const tripsPromise = fetch(`${API_URL}/trips`, { headers }).then((res) => res.json<Trip[]>());
  const stagesPromise = fetch(`${API_URL}/stages`, { headers }).then((res) => res.json<Stage[]>());
  const waypointsPromise = fetch(`${API_URL}/waypoints`, { headers }).then((res) => res.json<Waypoint[]>());
  const sosialmediaPromise = fetch(`${API_URL}/sosialmedia?count=3`, { headers }).then((res) => res.json<SosialMedia[]>());

  return { tripsPromise, stagesPromise, waypointsPromise, sosialmediaPromise }
}

export default function Index() {
  const { tripsPromise, stagesPromise, waypointsPromise, sosialmediaPromise } = useLoaderData<typeof loader>();

  

  const words = ["unforgettable", "amazing", "surreal", "memorable", "inspiring", "breathtaking"];

  return (
    <div className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <div
          className="absolute inset-0 w-full h-full"
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
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 felx items-center justify-center h-full bg-black/30">
          <div className="flex flex-col items-center justify-center text-center h-full">
            <h1
              className="text-2xl md:text-5xl font-bold text-foreground inline-block"
            >
              Experience the <FlipWords words={words} />
              <br />
              adventures with Saga Farmann
            </h1>
            <Link to="/join" prefetch="intent" aria-label="Join Us" className="mt-12">
              <Button className="text-sm md:text-base font-normal uppercase w-64 h-10 md:w-72 md:h-12 hover:bg-primary">Join Us</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center w-full mt-12 px-6 md:px-12">
        <section className="container w-full py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Suspense
              fallback={[...Array(3)].map((_, idx) => (
                <SosialMediaCardSkeleton key={idx} />
              ))}
            >
              <Await resolve={sosialmediaPromise}>
                {(sosialmedia) =>
                  sosialmedia.map((post) => (
                    <SosialMediaCard
                      key={post.id}
                      title={post.title}
                      description={post.description}
                      image={post.image}
                      url={post.url}
                    />
                  ))
                }
              </Await>
            </Suspense>
          </div>
        </section>
        <section className="container w-full py-12">
          <ExplorationGrid />
        </section>
        <section className="container w-full py-12">
          <MapProvider>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 w-full h-full">
              <div className="w-full h-64 md:h-[75vh] md:w-full rounded-lg overflow-hidden">
                <TripsMap />
              </div>
              <div className="w-full h-1/3 md:w-min md:h-[75vh]">
                <Suspense fallback={<TripsMapSidebarSkeleton />}>
                  <Await resolve={Promise.all([tripsPromise, stagesPromise, waypointsPromise])}>
                    {([trips, stages, waypoints]) => (
                      <TripsMapSidebar trips={trips} stages={stages} waypoints={waypoints} />
                    )}
                  </Await>
                </Suspense>
              </div>
            </div>
          </MapProvider>
        </section>
        {/* <section className="container w-full py-12">
          <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </section> */}
        <section className="relative container w-full py-12">
          <div className="relative rounded-lg overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('/assets/images/donate.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scaleX(-1)",
                filter: "blur(25px) brightness(0.2)",
              }}
            ></div>
            <div className="relative z-10 px-6 md:px-12 flex items-center justify-center">
              <div className="flex flex-col items-center text-center p-6 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Donate</h2>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mt-4">
                  Donate to keep the voyage going
                </h3>
                <p className="text-sm md:text-base md:w-2/3 text-foreground leading-relaxed mt-4">
                  <strong>Your support matters</strong>
                  <br />
                  If you want to support the voyage, please feel free to provide us with a donation.
                  All donations will be used solely to keep the ship moving and the crew fed.
                </p>
                <Link
                  to="https://www.paypal.com/donate/?hosted_button_id=2EAXYY2GZBJMY"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch="intent"
                  aria-label="Donate to Saga Farmann"
                  className="mt-8"
                >
                  <Button className="text-lg font-semibold w-48 h-12">
                    Donate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* const testimonials = [
  {
    logo: "",
    name: "",
    description: "",
    url: "",
  },
]; */