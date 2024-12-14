import useIsMobile from "~/hooks/useIsMobile";

export default function ExplorationGrid() {
  const isMobile = useIsMobile();

  const items = [
    {
      id: 1,
      type: "image",
      title: "Image Title",
      src: "/assets/images/expedition_1.jpg",
      mobile: true,
    },
    {
      id: 2,
      type: "text",
      title: "Viking Voyages",
      description:
        "The vikings travelled the world and established relationships and trade routes, got inspired by foreign cultures and left us all with some interesting stories to tell.",
      background: "/assets/images/expedition_1.jpg",
      mobile: true,
    },
    {
      id: 3,
      type: "image",
      title: "Image Title",
      src: "/assets/images/expedition_2.jpg",
      mobile: true,
    },
    {
      id: 4,
      type: "text",
      title: "Follow the vikings",
      description:
        "We would like to revisit sites and cities to remind us all about these relationships that resides from centuries ago.",
      background: "/assets/images/expedition_2.jpg",
      mobile: true,
    },
    {
      id: 5,
      type: "image",
      title: "Image Title",
      src: "/assets/images/expedition_3.jpg",
      mobile: false,
    },
    {
      id: 6,
      type: "text",
      title: "Be together",
      description:
        "These are times for friendship, cross-cultural understanding and sharing of common history.",
      background: "/assets/images/expedition_3.jpg",
      mobile: false,
    },
  ];

  const filteredItems = items.filter((item) => (isMobile ? item.mobile : true));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
      {filteredItems.map((item) =>
        item.type === "image" ? (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg h-60 sm:h-72 md:h-80"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            key={item.id}
            className="relative flex flex-col justify-center items-center rounded-lg overflow-hidden h-60 sm:h-72 md:h-80"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${item.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scaleX(-1)",
                filter: "blur(25px) brightness(0.2)",
              }}
            ></div>

            {/* Text Content */}
            <div className="relative z-10 text-white p-4">
              <p className="text-base sm:text-2xl text-center text-pretty">{item.description}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
