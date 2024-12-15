import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Thanks" },
    { name: "description", content: "Saga Farmann - Follow the Vikings" },
  ];
};

export default function Thanks() {
  return (
    <div className="h-screen flex justify-center items-center">
      <span>Thanks</span>
    </div>
  )
}