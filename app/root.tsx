import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

import "@fontsource-variable/inter";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="relative">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
      </head>
      <body>
        {children}
        <Scripts />
        <Links />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
