type NavLinks = {
  name: string;
  path: string;
  action: boolean;
}

export const links: NavLinks[] = [
  { name: "Sponsors", path: "/sponsors", action: false },
  { name: "About Us", path: "/about",    action: false },
  { name: "Info",     path: "/crew",     action: false },
  { name: "Join Us",  path: "/join",     action: true  },
];