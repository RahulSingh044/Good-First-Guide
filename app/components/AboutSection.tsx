import { Card } from "../components/ui/card";
import { Target, Users, Rocket, Heart } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Curated for Beginners",
      description: "Every issue is hand-picked and verified to be beginner-friendly, ensuring you start your open source journey with confidence."
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Join thousands of developers making their first contributions. Learn from others and grow together in a supportive environment."
    },
    {
      icon: Rocket,
      title: "Real-World Experience",
      description: "Work on actual projects used by real people. Build your portfolio while contributing to meaningful software."
    },
    {
      icon: Heart,
      title: "Make an Impact",
      description: "Your contributions help improve software used by millions. Every bug fix and feature matters to the community."
    }
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Good First Guide?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe everyone should have the opportunity to contribute to open source. 
            Our platform makes it easy to find issues that match your skill level and interests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 bg-card">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
