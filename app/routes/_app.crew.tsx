import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Crew" },
    { name: "description", content: "Saga Farmann - Follow the Vikings" },
  ];
};

// Sample roles data
const roles = [
  {
    name: "Saga Lundenwic 2025 - General information",
    description: "Background information about the project, voyage details, what to expect, how to apply and more.",
    downloadUrl: "/assets/download/pdf/Saga Lundenwic 2025 - Stages, Info.pdf",
  },
  {
    name: "Captain",
    description: "The Captain has the overall responsibility for the ship throughout the stage and is also responsible for the crew when the ship is on the move (sailing, motoring etc.)",
    downloadUrl: "/assets/download/pdf/Captain - Role description.pdf",
  },
  {
    name: "Chef",
    description: "The Chef is in charge of all meals needed for the crew on board the ship. The responsibility includes bunkering food, planning meals/timing with the Captain and the Stage Responsible and coordinating the actual cooking of the meals.",
    downloadUrl: "/assets/download/pdf/Chef - Role description.pdf",
  },
  {
    name: "Chief Engineer",
    description: "As Chief Engineer (CE) you have the overall responsibility for all technology on board, from electrical propulsion, battery banks, charge systems, generators and electric wiring to electronics and radios.",
    downloadUrl: "/assets/download/pdf/Chief Engineer - Role description.pdf",
  },
  {
    name: "Media Responsible",
    description: "The Media Responsible has the overall responsibility to coordinate all media activities related to the ship's voyage and the crew's work.",
    downloadUrl: "/assets/download/pdf/Media responsible - Role description.pdf",
  },
  {
    name: "Stage Responsible - Home based",
    description: "A home-based Stage Responsible (SR-H) is needed when a voyage is in progress abroad. The SR-H will coordinate actions relevant to do in Norway from a home office - all in close dialogue with the Stage Responsible based on the ship (SR-S)",
    downloadUrl: "/assets/download/pdf/Stage Responsible HOME - Role description.pdf",
  },
  {
    name: "Stage Responsible - On board",
    description: "Stage Responsible - on board the Ship (SR-S) has the overall responsibility for all activities with the ship and crew, when the ship is docked (when sailing the Captain has this responsibility).",
    downloadUrl: "/assets/download/pdf/Stage Responsible ON BOARD - Role description.pdf",
  },
];

export default function Index() {
  return (
    <div className="container min-h-screen mx-auto py-12 px-6 mt-12">
      <div className="py-8 mb-4 text-center">
        <h1 className="text-3xl font-bold">Saga Farmann Information</h1>
      </div>
      <div className="flex flex-col gap-6">
        {roles.map((role, index) => (
          <div key={index} className="bg-card shadow-md rounded-lg p-6 flex flex-col justify-between space-y-4">
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-semibold">{role.name}</h2>
              <p className="text-muted-foreground">{role.description}</p>
            </div>
            <div className="flex flex-row space-x-2 overflow-x-auto">
              <Link
                to={role.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-block whitespace-nowrap bg-primary text-primary-foreground font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                Download PDF
              </Link>
              <Link
                to={role.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block whitespace-nowrap bg-secondary text-primary-foreground font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                View PDF
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
