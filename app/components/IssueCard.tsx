"use client";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ExternalLink, Bookmark, GitBranch, Star } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useState } from "react";

interface IssueCardProps {
  id: number | string;
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
  id,
  title,
  repository,
  description,
  labels,
  stars,
  url,
  isBookmarked,
  onBookmarkToggle,
}: IssueCardProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async () => {
    if (!user) {
      console.warn("Please login to bookmark");
      return;
    }

    onBookmarkToggle?.();
    setLoading(true);

    try {
      await axios.post("/api/bookmarks", {
        userId: user.uid,
        itemId: id,
        title,
        repository,
        description,
        stars,
        url,
      });
    } catch (error) {
      console.error("Bookmark request failed:", error);
      onBookmarkToggle?.();
    } finally {
      setLoading(false);
    }
  };

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
          className="shrink-0 cursor-pointer"
          onClick={handleBookmarkClick}
          disabled={loading}
          aria-pressed={!!isBookmarked}
        >
          <Bookmark
            className={`w-5 h-5 transition-colors ${isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
          />
        </Button>
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