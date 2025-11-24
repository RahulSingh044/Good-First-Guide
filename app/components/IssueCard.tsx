import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ExternalLink, Bookmark, GitBranch, Star } from "lucide-react";

interface IssueCardProps {
  title: string;
  repository: string;
  description: string;
  labels: string[];
  stars: number;
  url: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

export const IssueCard = ({
  title,
  repository,
  description,
  labels,
  stars,
  url,
  isBookmarked,
  onBookmarkToggle,
}: IssueCardProps) => {
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
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          onClick={onBookmarkToggle}
        >
          <Bookmark
            className={`w-5 h-5 transition-colors ${
              isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <Badge key={label} variant="secondary" className="text-xs">
            {label}
          </Badge>
        ))}
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
