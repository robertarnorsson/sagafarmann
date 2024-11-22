import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Sagafarmann 2025" },
    { name: "description", content: "Saga Farman follow the vikings" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Sagafarmann 2025</p>
    </div>
  );
}