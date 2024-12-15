import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Sponsors" },
    { name: "description", content: "Saga Farman follow the vikings" },
  ];
};

export default function Index() {
  const sponsors = [
    {
      id: 1,
      image: "/assets/images/sponsors/sea_drive.webp",
      name: "SeaDrive",
      description: "The most modern viking ship in the world has of course electrical joystick controlled azimut POD's from SeaDrive. Since 2018, SeaDrive and the Oseberg Viking Heritage Foundation, who built Saga Farmann, have been working in a partnership to develop and test an electrical propulsion solution. Today SeaDrive sells these POD's to a large variety of customers throughout Europe - all based on an idea for a Viking ship.",
      link: "http://www.seadrive.no/",
    },
    {
      id: 2,
      image: "/assets/images/sponsors/tom_wilhelmsens_foundation.webp",
      name: "Tom Wilhelmsen's Foundation",
      description: "The Saga Asia 2023 project has received strong financial support from the Tom Wilhelmsen Foundation. These fundings gave us the confidence that the voyage can be done and gave us motivation to carry on the preparation for the voyage. It is obvious that without Wilhelmsen supporting us we would not have been able to leave Tønsberg - Thank you",
      link: "https://www.wilhelmsen.com/",
    },
    {
      id: 3,
      image: "/assets/images/sponsors/bluetec.webp",
      name: "BlueTec",
      description: "BlueTec is one of the first sponsors to help us with competence, equipment and manpower. From the very first attempt to electrify our ship, BlueTec has helped us with cabling and electric installations on board. As a test ship for solutions under development the installations were not permanent and every year a new installation or at least an upgrade was needed. Deadlines and challenging tasks has been handled nicely by BlueTec and for that we're truly grateful - Thanks",
      link: "https://bluetec.no/",
    },
    {
      id: 4,
      image: "/assets/images/sponsors/terjesen.webp",
      name: "Terjesen - the plumber",
      description: "Call the plumber! In the last weeks before departure we were told that in order to get our ship certified to enter EU (Germany) we needed to have all tubes from inlets under the waterline to be exchanged with steel pipes and swans neck above waterline.....Luckily Terjesen, the leading plummer in the area stepped in with short notice and fixed the plumbing. Very fast response and nice plumbing that even a viking must adore - thank you Terjesen",
      link: "https://terjesen.no/",
    },
    {
      id: 5,
      image: "/assets/images/sponsors/vtf.webp",
      name: "Vestfold & Telemark County",
      description: "The department of Cultural Heritage in our County administration was early to support us financially. With these funds we could undertake the planning of the voyage and kick of the initiatives needed to get momentum. Saga Farmann will bring our viking heritage out to people of Europe but our County definitely delivered a nice kick at the right time for us to get started - thanks",
      link: "https://www.vtfk.no/",
    },
    {
      id: 6,
      image: "/assets/images/sponsors/mercury.webp",
      name: "Mercury",
      description: "Our RIB is one of our most important safety measures and a versatile tool for the voyage. Our RIB is used to add power to the ship when needed acting as an external engine for pushing or pulling the ship. But also the RIB is used for logistic purposes running to and from shore with crew, food or fuel. Mercury has delivered a new 50Hp outboard engine for a very reasonable price making sure that we can rely on our important RIB on this long voyage - Thank you Mercury",
      link: "https://www.mercurymarine.com/",
    },
    {
      id: 7,
      image: "/assets/images/sponsors/eltek.webp",
      name: "Eltek",
      description: "Since 2019, when we installed our first large scale battery bank, Eltek has helped us with a state of the art charging solution. With the Eltek solution we can consume both generator and shore based electricity, convert it to 48V DC and charge our batteries. But most important is that Eltek has provided us with competence, spareparts and man hours to make sure that we can charge our ship anywhere and with confidence to adjust to almost any power source we meet - well done Eltek",
      link: "https://www.eltek.com/",
    },
  ];

  return (
    <div className="container min-h-screen mx-auto py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Saga Farmann Sponsors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.id}
              to={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full group hover:-translate-y-1 transition-transform"
            >
              <div
                className="h-full bg-card rounded-lg shadow-md overflow-hidden group-hover:shadow-lg transition-shadow"
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="w-full h-48 bg-gray-200 object-contain p-4"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{sponsor.name}</h2>
                  <p className="mb-4">{sponsor.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
