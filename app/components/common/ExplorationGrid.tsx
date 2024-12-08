export default function ExplorationGrid() {
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
      title: "Exploration of Viking Seafarers",
      description: "Discover the adventurous journeys of the Vikings across Europe.",
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
      title: "Norse Mythology",
      description: "Dive into the rich tapestry of Norse legends and gods.",
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
      title: "Expeditions to Miklagard",
      description: "Follow the Vikings as they journeyed to Constantinople.",
      mobile: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {items.map((item) =>
        item.type === "image" ? (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg h-80"
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
            className="flex flex-col justify-center items-center rounded-lg bg-card p-6 text-center shadow-md h-80"
          >
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-card-foreground">{item.description}</p>
          </div>
        )
      )}
    </div>
  );
}
