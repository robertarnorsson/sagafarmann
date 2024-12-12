import { Link } from "@remix-run/react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";

interface SosialMediaCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function SosialMediaCard({
  title,
  description,
  image,
  url,
}: SosialMediaCardProps) {
  const getSocialMediaIcon = (url: string) => {
    if (url.includes("facebook.com")) return SiFacebook;
    if (url.includes("instagram.com")) return SiInstagram;
    if (url.includes("youtube.com")) return SiYoutube;
    return null;
  };

  const Icon = getSocialMediaIcon(url);

  return (
    <Link to={url} target="_blank" rel="noreferrer noopener" className="block">
      <div className="rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 py-3 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <ActionButton icon={Heart} />
              <ActionButton icon={MessageCircle} />
              <ActionButton icon={Send} />
            </div>
            <div>
              {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>
          <div className="relative">
            <p className="text-sm text-card-foreground max-h-16 overflow-hidden">
              {description}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}



export function SosialMediaCardSkeleton() {
  return (
    <div className="block">
      <div className="rounded-lg shadow-md bg-card overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-muted"></div>
        <div className="p-4 py-3 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-4 h-4 bg-muted-foreground rounded-full"
                ></div>
              ))}
            </div>
            <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
          </div>
          {/* Description Placeholder */}
          <div className="space-y-2">
            <div className="h-[28px] bg-muted-foreground rounded w-full"></div>
            <div className="h-[28px] bg-muted-foreground rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}



function ActionButton({ icon: Icon }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) {
  return (
    <button className="text-muted-foreground hover:text-card-foreground">
      <Icon className="w-4 h-4" />
    </button>
  );
}