import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Sponsors" },
    { name: "description", content: "Saga Farman follow the vikings" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p>Saga Farmann Sponsors</p>
    </div>
  );
}