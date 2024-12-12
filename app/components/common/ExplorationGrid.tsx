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
      description: "The vikings travelled the world and established relationships and trade routes, got inspired by foreign cultures and left us all with some interesting stories to tell.",
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
      description: "We would like to revisit sites and cities to remind us all about these relationships that resides from centuries ago.",
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
      description: "These are times for friendship, cross-cultural understanding and sharing of common history.",
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
            className="flex flex-col justify-center items-center rounded-lg bg-card p-6 text-center shadow-md h-60 sm:h-72 md:h-80"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-sm sm:text-base text-card-foreground">
              {item.description}
            </p>
          </div>
        )
      )}
    </div>
  );
}
