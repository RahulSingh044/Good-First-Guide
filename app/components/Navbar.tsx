"use client";
import Link from 'next/link'
import { Avatar, AvatarImage } from '../components/ui/avator';
import { Button } from '../components/ui/button';
import { Bell ,LogOut, Github } from 'lucide-react'
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from '../hooks/useAuth';
import { loginWithGithub } from '@/lib/auth';
import { useRouter } from 'next/navigation';;
import { logoutUser } from '@/lib/auth';
import { useEffect } from 'react';
import { NotificationDropdown } from './NotificationModal';

function Navbar() {

    const { user, loading } = useAuth();
    const loggedIn = !!user;
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const user = await loginWithGithub();
            if (user) {
                router.push("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    useEffect(() => {
        if (user) {
            console.log("User info:", user);
        }
    }, [user]);

    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="text-primary">Good</span>
                    <span className="text-foreground">First Guide</span>
                </Link>
                <div className="flex items-center gap-6">
                    <ThemeToggle />

                    {!loading && (
                        loggedIn ? (
                            <>
                            <NotificationDropdown />
                                <Link href={`/profile/${user.uid}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.photoURL} />
                                    </Avatar>
                                    <span className="hidden sm:inline">{user.displayName}</span>
                                </Link>
                                <Button
                                    onClick={logoutUser}
                                    variant="ghost" size="sm" className='cursor-pointer'>
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={handleLogin}
                                variant="default" className='cursor-pointer hover:bg-black rounded-full bg-black text-white '>
                                <Github size={16} />
                                <p className='text-sm'>Log In</p>
                            </Button>
                        )
                    )}
                    
                </div>
            </div>
        </header >
    )
}

export default Navbar