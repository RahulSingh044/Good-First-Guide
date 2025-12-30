"use client";

import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avator";
import { Button } from "../ui/button";
import { LogOut, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginWithGithub, logoutUser } from "@/lib/auth/client";
import { NotificationDropdown } from "../NotificationModal";
import { useEffect } from "react";

type Props = {
    user: {
        uid: string;
        name?: string;
        avatar?: string;
    } | null;
};

export default function NavbarClient({ user }: Props) {
    const router = useRouter();
    const loggedIn = !!user;

    const handleLogin = async () => {
        await loginWithGithub();
        router.refresh(); 
    };

    const handleLogout = async () => {
        await logoutUser();
        router.refresh();
    };

    useEffect(() => {
        
    }, [loggedIn])

    return loggedIn ? (
        <>
            <NotificationDropdown userId={user.uid} />

            <Link
                href={`/profile/${user.uid}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <Avatar className="h-8 w-8 border drop-shadow-2xl">
                    <AvatarImage src={user?.avatar} alt={user.name}/>
                </Avatar>
                <span className="hidden sm:inline">
                    {user.name}
                </span>
            </Link>

            <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
            >
                <LogOut className="h-4 w-4" />
            </Button>
        </>
    ) : (
        <Button
            onClick={handleLogin}
            className="cursor-pointer hover:bg-black rounded-full bg-black text-white"
        >
            <Github size={16} />
            <span className="text-sm">Log In</span>
        </Button>
    );
}
