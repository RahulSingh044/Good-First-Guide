
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avator';
import { Button } from '../components/ui/button';
import { User2, LogOut } from 'lucide-react'
import { ThemeToggle } from "./ThemeToggle";

function Navbar() {
    const loggedIn = true;
    const user = {
        name: "Alex Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    };

    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <span className="text-primary">Good</span>
                    <span className="text-foreground">First Guide</span>
                </Link>
                <div className="flex items-center gap-6">
                    <ThemeToggle />

                    {loggedIn ? (
                        <>
                            <Link href='/profile' className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="hidden sm:inline">{user.name}</span>
                            </Link>
                            <Button variant="ghost" size="sm" className='cursor-pointer'>
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </>
                    ) :
                        (
                            <Button variant="default" className='cursor-pointer'>
                                <User2 size={16} />
                                <p className='text-sm'>Sign In</p>
                            </Button>
                        )
                    }
                </div>
            </div>

        </header >
    )
}

export default Navbar