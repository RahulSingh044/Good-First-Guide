import { Card } from "../components/ui/card";
import { Code, Briefcase, Network, Trophy } from "lucide-react";

export const OpenSourceBenefits = () => {
  const benefits = [
    {
      icon: Code,
      title: "Improve Your Skills",
      description: "Learn from experienced developers through code reviews and feedback. Work with industry-standard tools and best practices.",
      stats: "90% of contributors report improved coding skills"
    },
    {
      icon: Briefcase,
      title: "Boost Your Career",
      description: "Stand out to employers with a strong GitHub profile. Many companies actively recruit from open source communities.",
      stats: "73% of hiring managers value open source contributions"
    },
    {
      icon: Network,
      title: "Build Your Network",
      description: "Connect with developers worldwide. Build relationships that can lead to job opportunities and collaborations.",
      stats: "Average contributor gains 50+ new connections"
    },
    {
      icon: Trophy,
      title: "Gain Recognition",
      description: "Build a reputation in the developer community. Your contributions are public and showcase your abilities.",
      stats: "Contributors get 2x more profile views"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Contribute to Open Source?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Open source contributions offer tremendous benefits for your career, skills, and professional network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-8 hover:shadow-lg transition-all duration-300 border-border bg-card group">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-primary">{benefit.stats}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
