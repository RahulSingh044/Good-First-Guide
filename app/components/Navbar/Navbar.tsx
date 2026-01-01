import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import NavbarClient from "./NavbarClient";
import { getCurrentUser } from "@/lib/auth/server";

export const revalidate = 60;

export default async function Navbar() {
    const user = await getCurrentUser();


return (
  <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
    <div className="container flex h-16 items-center justify-between px-6">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        {/* Desktop */}
        <span className="hidden sm:inline">
          <span className="text-primary">Good</span>{" "}
          <span className="text-foreground">First Guide</span>
        </span>

        {/* Mobile */}
        <span className="inline sm:hidden text-primary">
          GFG
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <NavbarClient user={user} />
      </div>
    </div>
  </header>
);

}
