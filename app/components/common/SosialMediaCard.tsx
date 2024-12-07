import { Link } from "@remix-run/react";

interface SosialMediaCardProps {
  title: string;
  description: string;
  image: string;
  url: string
}

export default function SosialMediaCard({ title, description, image, url }: SosialMediaCardProps) {
  return (
    <Link to={url}>
      <div className="flex ">
        <img src={image} alt="title" />
        {title}
        {description}
      </div>
    </Link>
  )
}