import { Link } from "@remix-run/react";
import { Heart, MessageCircle, Send } from "lucide-react";

interface SosialMediaCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export default function SosialMediaCard({
  title,
  description,
  image,
  url,
}: SosialMediaCardProps) {
  return (
    <Link to={url} target="_blank" rel="noreferrer noopener" className="block max-w-sm mx-auto">
      <div className="rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 pt-3 space-y-3">
          <div className="flex items-center space-x-3">
            <ActionButton icon={Heart} />
            <ActionButton icon={MessageCircle} />
            <ActionButton icon={Send} />
          </div>
          <div className="space-y-1">
            <h2 className="text-md font-semibold text-card-foreground">{title}</h2>
            <p className="text-sm text-card-foreground line-clamp-2" title={description}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ActionButton({ icon: Icon }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) {
  return (
    <button className="text-muted-foreground hover:text-card-foreground">
      <Icon className="w-4 h-4" />
    </button>
  );
}
