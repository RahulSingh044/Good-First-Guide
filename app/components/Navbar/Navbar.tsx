import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import NavbarClient from "./NavbarClient";
import { getCurrentUser } from "@/lib/auth/server";

export const revalidate = 60;

export default async function Navbar() {
    const user = await getCurrentUser();

    console.log("server", user?.avatar);

    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="text-primary">Good</span>
                    <span className="text-foreground">First Guide</span>
                </Link>

                <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <NavbarClient user={user} />
                </div>
            </div>
        </header>
    );
}
