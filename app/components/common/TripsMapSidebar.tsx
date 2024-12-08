import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "../ui/separator";
import { TextAnimation } from "~/components/common/TextAnimation";
import { Stage, Trip, Waypoint } from "~/types";
import { useMap } from "~/context/MapContext";
import { fromLonLat } from "ol/proj";

interface TripsMapSidebarProps {
  trips: Trip[];
  stages: Stage[];
  waypoints: Waypoint[];
}

export default function TripsMapSidebar({ trips, stages, waypoints }: TripsMapSidebarProps) {
  const { map, addWaypoints, removeWaypoints } = useMap();

  const [page, setPage] = useState<"trips" | "stages" | "info">("trips");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  // Dynamically handle waypoints based on the current page and selection
  useEffect(() => {
    removeWaypoints();

    if (page === "trips") {
      // Show all waypoints for all stages in all trips
      const allWaypoints = waypoints.map((waypoint) =>
        fromLonLat([waypoint.longitude, waypoint.latitude])
      );

      if (allWaypoints.length === 1) {
        addWaypoints(allWaypoints);
        map.current?.getView().animate({ center: allWaypoints[0], zoom: 10, duration: 500 });
      } else if (allWaypoints.length > 1) {
        addWaypoints(allWaypoints);

        const extent = allWaypoints.reduce(
          (extent, coord) => {
            extent[0] = Math.min(extent[0], coord[0]); // Min X (Longitude)
            extent[1] = Math.min(extent[1], coord[1]); // Min Y (Latitude)
            extent[2] = Math.max(extent[2], coord[0]); // Max X (Longitude)
            extent[3] = Math.max(extent[3], coord[1]); // Max Y (Latitude)
            return extent;
          },
          [Infinity, Infinity, -Infinity, -Infinity]
        );

        map.current?.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 500 });
      }
    } else if (page === "stages" && selectedTrip) {
      // Show all waypoints for the selected trip
      const tripWaypoints = stages
        .filter((stage) => stage.trip_id === selectedTrip.id)
        .flatMap((stage) =>
          waypoints
            .filter((waypoint) => waypoint.stage_id === stage.id)
            .map((waypoint) => fromLonLat([waypoint.longitude, waypoint.latitude]))
        );

      if (tripWaypoints.length === 1) {
        addWaypoints(tripWaypoints);
        map.current?.getView().animate({ center: tripWaypoints[0], zoom: 10, duration: 500 });
      } else if (tripWaypoints.length > 1) {
        addWaypoints(tripWaypoints);

        const extent = tripWaypoints.reduce(
          (extent, coord) => {
            extent[0] = Math.min(extent[0], coord[0]); // Min X (Longitude)
            extent[1] = Math.min(extent[1], coord[1]); // Min Y (Latitude)
            extent[2] = Math.max(extent[2], coord[0]); // Max X (Longitude)
            extent[3] = Math.max(extent[3], coord[1]); // Max Y (Latitude)
            return extent;
          },
          [Infinity, Infinity, -Infinity, -Infinity]
        );

        map.current?.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 500 });
      }
    } else if (page === "info" && selectedStage) {
      // Show waypoints for the selected stage
      const stageWaypoints = waypoints
        .filter((waypoint) => waypoint.stage_id === selectedStage.id)
        .map((waypoint) => fromLonLat([waypoint.longitude, waypoint.latitude]));

      if (stageWaypoints.length === 1) {
        addWaypoints(stageWaypoints);
        map.current?.getView().animate({ center: stageWaypoints[0], zoom: 10, duration: 500 });
      } else if (stageWaypoints.length > 1) {
        addWaypoints(stageWaypoints);

        const extent = stageWaypoints.reduce(
          (extent, coord) => {
            extent[0] = Math.min(extent[0], coord[0]); // Min X (Longitude)
            extent[1] = Math.min(extent[1], coord[1]); // Min Y (Latitude)
            extent[2] = Math.max(extent[2], coord[0]); // Max X (Longitude)
            extent[3] = Math.max(extent[3], coord[1]); // Max Y (Latitude)
            return extent;
          },
          [Infinity, Infinity, -Infinity, -Infinity]
        );

        map.current?.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 500 });
      }
    }
  }, [page, selectedTrip, selectedStage, stages, waypoints, map, addWaypoints, removeWaypoints]);

  const handleBack = () => {
    if (page === "info") {
      setPage("stages");
    } else if (page === "stages") {
      setPage("trips");
    }
  };

  const currentStages = selectedTrip
    ? stages.filter((stage) => stage.trip_id === selectedTrip.id)
    : [];

  return (
    <div className="w-full md:w-64 lg:w-96 bg-secondary shadow-md rounded-lg overflow-x-hidden relative flex flex-col h-full">
      <div className="bg-secondary text-foreground flex items-center justify-between p-4 flex-none h-16">
        <div className="relative w-full flex items-center gap-2">
          <div
            className={`absolute left-0 transition-all duration-500 ease-in-out ${
              page !== "trips" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
          <h1
            className={`text-xl font-semibold transition-all duration-500 ease-in-out ${
              page !== "trips" ? "ml-12" : "ml-2"
            }`}
          >
            <TextAnimation>
              {page === "trips" ? "Select a Trip" : ""}
              {page === "stages" && selectedTrip ? selectedTrip.name : ""}
              {page === "info" && selectedStage ? selectedStage.name : ""}
            </TextAnimation>
          </h1>
        </div>
      </div>
      <Separator className="bg-muted-foreground/50" />
      <div
        className="flex flex-1 transition-transform duration-300"
        style={{
          transform:
            page === "trips"
              ? "translateX(0%)"
              : page === "stages"
              ? "translateX(-100%)"
              : "translateX(-200%)",
        }}
      >
        <div className="w-full flex-shrink-0 p-4 box-border">
          <div className="flex flex-col space-y-2">
            {trips.map((trip) => (
              <Button
                key={trip.id}
                variant="ghost"
                className="w-full text-left hover:bg-foreground/10 rounded"
                onClick={() => {
                  setSelectedTrip(trip);
                  setPage("stages");
                }}
              >
                <span className="w-full">{trip.name}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full flex-shrink-0 p-4 box-border">
          <div className="flex flex-col space-y-2">
            {currentStages.map((stage) => (
              <Button
                key={stage.id}
                variant="ghost"
                className="w-full text-left hover:bg-foreground/10 rounded"
                onClick={() => {
                  setSelectedStage(stage);
                  setPage("info");
                }}
              >
                <span className="w-full">{`${stage.departure_port} - ${stage.arrival_port}`}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full flex-shrink-0 p-4 box-border">
          {selectedStage ? (
            <div>
              <h2 className="text-lg font-semibold">{selectedStage.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{selectedStage.description}</p>
              <p className="mt-4 text-sm">
                <strong>Departure Port:</strong> {selectedStage.departure_port}
              </p>
              <p className="text-sm">
                <strong>Departure Date:</strong> {selectedStage.departure_date}
              </p>
              <p className="mt-4 text-sm">
                <strong>Arrival Port:</strong> {selectedStage.arrival_port}
              </p>
              <p className="text-sm">
                <strong>Arrival Date:</strong> {selectedStage.arrival_date}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No stage selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}