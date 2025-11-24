import { Card } from "../components/ui/card";
import { GitFork, GitBranch, GitPullRequest, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: GitFork,
    title: "Fork the Repository",
    description: "Click the 'Fork' button on GitHub to create your own copy of the repository.",
    details: [
      "Navigate to the repository page",
      "Click 'Fork' in the top right corner",
      "Wait for GitHub to create your fork",
    ],
  },
  {
    icon: GitBranch,
    title: "Clone & Create Branch",
    description: "Clone your fork locally and create a new branch for your changes.",
    details: [
      "git clone https://github.com/YOUR_USERNAME/repo.git",
      "cd repo",
      "git checkout -b fix/issue-name",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Make Your Changes",
    description: "Work on the issue, test your changes, and commit them.",
    details: [
      "Make your code changes",
      "Test thoroughly",
      "git add .",
      "git commit -m 'fix: descriptive message'",
    ],
  },
  {
    icon: GitPullRequest,
    title: "Submit Pull Request",
    description: "Push your changes and create a pull request on GitHub.",
    details: [
      "git push origin fix/issue-name",
      "Go to GitHub and click 'New Pull Request'",
      "Describe your changes clearly",
      "Submit and wait for review",
    ],
  },
];

export const ContributionGuide = () => {
  return (
    <section id="guide" className="py-20 px-4 bg-linear-to-b from-secondary/30 to-background">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How to <span className="text-primary">Contribute</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to make your first open source contribution
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="p-6 space-y-4 hover:shadow-xl transition-all duration-300 border-border/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="pl-16 space-y-2">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm font-mono text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Pro Tips for Success</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Read the guidelines:</strong> Always check the CONTRIBUTING.md file in the repository
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Write clear commits:</strong> Use descriptive commit messages that explain what and why
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Test thoroughly:</strong> Make sure your changes work and don't break existing features
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Be patient:</strong> Maintainers are often volunteers - reviews may take time
                </span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
};
