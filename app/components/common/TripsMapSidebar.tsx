import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "../ui/separator";
import { TextAnimation } from "~/components/common/TextAnimation";
import { useMap } from "~/context/MapContext";

type Location = {
  name: string;
  description: string;
  coordinates: [number, number]; // Longitude, Latitude
};

type TripsData = {
  [year: string]: Location[];
};

const tripsData: TripsData = {
  "2021": [
    {
      name: "Norway",
      description:
        "Norway is known for its stunning fjords, Viking history, and breathtaking landscapes. It offers a unique blend of modern cities and pristine wilderness areas.",
      coordinates: [10.7522, 59.9139],
    },
    {
      name: "Denmark",
      description:
        "Denmark is renowned for its Viking heritage, charming towns, and innovative design. It is a haven for cyclists and a hub of Scandinavian culture.",
      coordinates: [12.5683, 55.6761],
    },
  ],
  "2022": [
    {
      name: "Iceland",
      description:
        "Iceland is famous for its volcanic landscapes, geysers, and the Northern Lights. It is a paradise for adventure seekers and nature lovers.",
      coordinates: [-21.8174, 64.1355],
    },
    {
      name: "Sweden",
      description:
        "Sweden combines natural beauty with cultural richness. From the Stockholm archipelago to the Northern Lights, it is a diverse travel destination.",
      coordinates: [18.0686, 59.3293],
    },
  ],
  "2023": [
    {
      name: "Finland",
      description:
        "Finland is known for its saunas, the Midnight Sun, and the Northern Lights. It is a land of thousands of lakes and vast forests.",
      coordinates: [24.9354, 60.1695],
    },
    {
      name: "Greenland",
      description:
        "Greenland is an Arctic gem with glaciers, icebergs, and Inuit culture. It offers unparalleled opportunities for polar adventures.",
      coordinates: [-51.7216, 64.1835],
    },
  ],
};

export default function TripsMapSidebar() {
  const { flyTo } = useMap();

  const [page, setPage] = useState<"years" | "locations" | "info">("years");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const years = Object.keys(tripsData);

  const handleBack = () => {
    if (page === "info") {
      setPage("locations");
    } else if (page === "locations") {
      setPage("years");
    }
  };

  const currentLocations = selectedYear ? tripsData[selectedYear] : [];
  const locationInfo = selectedLocation || { name: "", description: "" };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setPage("info");
    flyTo(location.coordinates, 7);
  };

  return (
    <div className="w-full md:w-64 lg:w-96 bg-secondary shadow-md rounded-b-lg md:rounded-r-lg md:rounded-b-none overflow-hidden relative flex flex-col h-full">
      <div className="bg-secondary text-primary flex items-center justify-between p-4 overflow-hidden relative">
        <div className="relative w-full flex items-center gap-2">
          <div
            className={`absolute left-0 transition-all duration-500 ease-in-out ${
              page !== "years" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
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
              page !== "years" ? "ml-12" : "ml-2"
            }`}
          >
            <TextAnimation>
              {page === "years" ? "Select a Trip" : ""}
              {page === "locations" && selectedYear ? selectedYear : ""}
              {page === "info" ? locationInfo.name : ""}
            </TextAnimation>
          </h1>
        </div>
      </div>
      <Separator className="bg-muted-foreground/50" />
      <div
        className="flex flex-1 transition-transform duration-300"
        style={{
          transform:
            page === "years"
              ? "translateX(0%)"
              : page === "locations"
              ? "translateX(-100%)"
              : "translateX(-200%)",
        }}
      >
        {/* Page: Years */}
        <div className="w-full flex-shrink-0 p-4 box-border">
          <div className="flex flex-col space-y-2">
            {years.map((year) => (
              <Button
                key={year}
                variant="ghost"
                className="w-full text-left hover:bg-primary/10 rounded"
                onClick={() => {
                  setSelectedYear(year);
                  setPage("locations");
                }}
              >
                <span className="w-full">{year}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Page: Locations */}
        <div className="w-full flex-shrink-0 p-4 box-border">
          <div className="flex flex-col space-y-2">
            {currentLocations.map((location) => (
              <Button
                key={location.name}
                variant="ghost"
                className="w-full text-left hover:bg-primary/10 rounded"
                onClick={() => handleLocationClick(location)}
              >
                <span className="w-full">{location.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Page: Info */}
        <div className="w-full flex-shrink-0 p-4 box-border overflow-y-auto">
          <p className="text-sm text-muted-foreground">{locationInfo.description}</p>
        </div>
      </div>
    </div>
  );
}
