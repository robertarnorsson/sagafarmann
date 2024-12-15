import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - About Us" },
    { name: "description", content: "Saga Farman follow the vikings" },
  ];
};

export default function About() {
  const teamInfo = [
    {
      id: 1,
      title: "The fourth vikingship - an archeological reconstruction",
      description: `
        Saga Farmann is an archaeological reconstruction of the Klåstadship, referred to as Norway's fourth Viking ship. It was found as early as 1893, but only excavated in 1970. The ship is on display at the Slottsfjellmuseet in Tønsberg.
        The Klåstad ship was found on a field deep in Viksfjord in Larvik, quite close to Kaupangen in Skiringssal. One imagines that the ship was wrecked out on Vikskilen and ended up sinking deep in Klåstadkilen. When the ship was found some distance inland, it is because the land here has risen about 2 meters since the Viking Age. The ship was also somewhat damaged by work to drain the land where it was found.
        The Klåstad ship differs in several ways from the more famous Viking ships; Oseberg, Gokstad and Tune. It sunk and was recovered from the seabed, while the other three ships are gravegoods. The Klåstadskipet was probably a cargo ship, a sloop and is dated to the year 998 A.D. Like other Viking ships, it is clink-built. It had paddles for oars. The keel is 16.15 meters long, and thus slightly smaller than the Gokstad ship. When the ship was lost, there was a cargo on board of whetstone blanks from Eidsborg in Telemark.
      `,
      image: "/assets/images/about_1.jpg",
      reverse: false,
    },
    {
      id: 2,
      title: "To Miklagard - once again!",
      description: `
        A thousand years ago, Vikings from Scandinavia served as bodyguards to the emperor in Constantinople. And in the Norwegian saga we can read about the Viking Ottar - who sailed around Norway and probably into The White Sea. Eivind Luthen was the one who came up with the idea to combine Ottar's journey with visiting the old city of Miklagard.
        But the idea of traveling around Norway was put aside - our country has such a long and troublesome coastline that we would have had to spend a lot of time just getting around our own country. Moreover, it was no longer tempting to travel through Russia.
        Thus we came up with the idea to do something that no Viking has done before - in good Viking tradition. We would use the new canals and locks that connect the rivers of Europe, we would also use engine power to travel upstream towards the watershed - and get to Istanbul - or Miklagard, via the waterways of Europe. The oldest of the canals actually dates from the 14th century, so if the Vikings had held out a little longer, they could have taken the trip we are now embarking on.
      `,
      image: "/assets/images/about_2.jpg",
      reverse: true,
    },
    {
      id: 3,
      title: "From Tønsberg with love",
      description: `
        The Norwegian coastal town of Tønsberg actually has a viking shipyard where currently the third full size large viking ship is being built. All the ships and small boats made here are part of the portfolio of the Oseberg Viking Heritage foundation.
        One part of this foundation is the Saga Farman boat guild. A gang of likeminded people sharing an interest in viking ship building, navigation, culture and life. We all help out taking care of the ship all year round, scraping, tarring, carrying ballast and all the other work that follows owning a wooden boat. We have also been training crew and getting the ship ready for the big voyage since the beginning of the construction of the ship late in 2014. She is not any wooden boat, she is a full grown vikingship of almost 21 meters long and 5 meters wide and requires a lot of tender loving care.
        At the moment this ship is underway to Istanbul, to reestablish old merchant seaways and contacts - Saga Farmann is invited by the archeological society of Istanbul. The plan is to leave the ship in Istanbul over the winter, and sail her in the Mediterranean next year. Stay tuned!
      `,
      image: "/assets/images/about_3.jpg",
      reverse: false,
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-12">
      <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
      <div className="grid gap-10">
        {teamInfo.map((info) => (
          <div
            key={info.id}
            className={`grid md:grid-cols-2 items-center gap-6 ${
              info.reverse ? "md:grid-cols-[auto_auto]" : ""
            }`}
          >
            {!info.reverse && (
              <div>
                <img
                  src={info.image}
                  alt={info.title}
                  className="rounded-lg shadow-lg w-full object-cover aspect-video"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold mb-4">{info.title}</h2>
              <p>{info.description}</p>
            </div>
            {info.reverse && (
              <div>
                <img
                  src={info.image}
                  alt={info.title}
                  className="rounded-lg shadow-lg w-full object-cover aspect-video"
                />
              </div>
            )}
          </div>
        ))}
        <div className="h-full">
          <div>
            <h2 className="text-4xl font-semibold mb-4">From the small coastal town of Tønsberg - out into the big, big world!</h2>
            <p className="mb-4 text-center">The vikings - better than their reputation. They were also very able boatbuilders and navigators.</p>
          </div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover rounded-lg aspect-video"
            aria-label="Background Video"
          >
            <source src="/assets/videos/about_video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}