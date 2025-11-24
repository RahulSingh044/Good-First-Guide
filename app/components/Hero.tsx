import { Button } from "../components/ui/button";
import CountUp from "../components/animations/CountUp";
import { Search, Code2, BookOpen } from "lucide-react";
import Link from "next/link";
export const Hero = () => {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-accent/5 to-background -z-10" />

            <div className="container mx-auto max-w-6xl">
                <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Your First Open Source Journey Starts Here</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Discover Your Perfect
                        <br />
                        <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                            Good First Issue
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Find beginner-friendly open source issues tailored to your skills.
                        Start contributing to projects you care about today.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Link href="/exploring">
                        <Button
                            size="lg"
                            className="text-lg px-8 h-14 bg-linear-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                            onClick={() => scrollToSection("explore")}
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Start Exploring
                        </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 h-14 border-2 hover:bg-secondary transition-all duration-300"
                            onClick={() => scrollToSection("guide")}
                        >
                            <BookOpen className="w-5 h-5 mr-2" />
                            Learn How to Contribute
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-primary">
                                <CountUp
                                    from={0}
                                    to={1000}
                                    direction="up"
                                    duration={0.5}
                                    className="count-up-text"
                                />+
                            </div>
                            <div className="text-sm text-muted-foreground">Curated Issues</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-primary"><CountUp
                                    from={0}
                                    to={50}
                                    direction="up"
                                    duration={1}
                                    className="count-up-text"
                                />+
                            </div>
                            <div className="text-sm text-muted-foreground">Projects</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-primary">
                                <CountUp
                                    from={0}
                                    to={10}
                                    direction="up"
                                    duration={1}
                                    className="count-up-text"
                                />+
                            </div>
                            <div className="text-sm text-muted-foreground">Tech Stacks</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
