import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ExternalLink, GitBranch, Star, CheckCircle2, Clock, CircleDot } from "lucide-react";

type ContributionStatus = "completed" | "in-progress" | "pending";

interface ContributionCardProps {
  title: string;
  repository: string;
  description: string;
  labels: string[];
  stars: number;
  url: string;
  status: ContributionStatus;
  contributedAt: string;
}

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  pending: {
    label: "Pending Review",
    icon: CircleDot,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
};

export const ContributionCard = ({
  title,
  repository,
  description,
  labels,
  stars,
  url,
  status,
  contributedAt,
}: ContributionCardProps) => {
  const StatusIcon = statusConfig[status].icon;

  return (
    <Card className="p-6 space-y-4 hover:shadow-xl transition-all duration-300 border-border/50 group">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GitBranch className="w-4 h-4" />
            <span className="font-medium">{repository}</span>
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-xs">{stars}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <Badge 
          variant="outline" 
          className={`shrink-0 flex items-center gap-1.5 ${statusConfig[status].className}`}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {statusConfig[status].label}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {labels.map((label) => (
          <Badge key={label} variant="secondary" className="text-xs">
            {label}
          </Badge>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">
          Contributed on {contributedAt}
        </span>
      </div>

      <div className="pt-2">
        <Button
          variant="outline"
          className="w-full group/button border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View on GitHub
            <ExternalLink className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </Card>
  );
};
