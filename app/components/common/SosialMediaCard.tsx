
interface SosialMediaCardProps {
  title: string;
  description: string;
  image: string;
}

export default function SosialMediaCard({ title, description, image }: SosialMediaCardProps) {
  return (
    <div className="flex ">
      <img src={image} alt="title" />
      {title}
      {description}
    </div>
  )
}