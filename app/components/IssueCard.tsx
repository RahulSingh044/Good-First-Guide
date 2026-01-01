"use client";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ExternalLink, Bookmark, GitBranch, Star } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

interface IssueCardProps {
  id: number | string;
  title: string;
  repository: string; // owner/repo
  description: string;
  labels: string[];
  stars: number;
  url: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

/* -------------------------------- Utils -------------------------------- */

export function parseGithubUrl(url: string) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);

  return {
    owner: parts[0],
    repo: parts[1],
    type: parts[2],
    number: parts[3] ?? null,
  };
}

/* ------------------------------- Component ------------------------------ */

export const IssueCard = ({
  id,
  title,
  repository,
  description,
  labels,
  stars,
  url,
  isBookmarked = false,
  onBookmarkToggle,
}: IssueCardProps) => {
  const { user } = useAuth();
  const { owner, repo, number } = parseGithubUrl(url);

  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  /* ---------------------------- VS Code Redirect ---------------------------- */

  const redirectToVsCode = () => {
    if (!owner || !repo || !number) return;

    const params = new URLSearchParams({
      owner,
      repo,
      issue: number,
    });

    window.location.href = `vscode://OrbitStudio.gfg?${params.toString()}`;
  };

  /* -------------------------- Save Issue + Notify --------------------------- */

  const handleIssueInDb = async () => {
    if (!user) {
      toast.error("Login first to access this");
      return;
    }

    setBtnLoading(true);

    try {
      const res = await fetch("/api/user/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          githubUserName: user.reloadUserInfo?.screenName,
          issueNumber: number,
          issueTitle: title,
        }),
      });

      if (!res.ok) throw new Error("Failed to save issue");

      redirectToVsCode();

      await fetch("/api/notifications/cloned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          repo,
          title,
        }),
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to process issue");
    } finally {
      setBtnLoading(false);
    }
  };

  /* ------------------------------ Bookmark ------------------------------ */

  const handleBookmarkClick = async () => {
    if (!user) {
      toast.error("Please login to bookmark");
      return;
    }

    setBookmarkLoading(true); // optional loading state

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,       
          itemId: id,             
          title,                  
          repository,            
          description,            
          stars,                  
          url,                  
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Bookmark request failed");
      }

      onBookmarkToggle?.();

      toast.success(
        data.action === "added"
          ? "Bookmarked successfully!"
          : "Bookmark removed!"
      );
    } catch (error: any) {
      console.error("Bookmark failed:",);
      toast.error(error.message || "Unable to update bookmark");
    } finally {
      setBookmarkLoading(false);
    }
  };


  /* -------------------------------- Render -------------------------------- */

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

          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleBookmarkClick}
          disabled={bookmarkLoading}
          aria-pressed={isBookmarked}
        >
          <Bookmark
            className={`w-5 h-5 transition-colors ${isBookmarked
                ? "fill-primary text-primary"
                : "text-muted-foreground"
              }`}
          />
        </Button>
      </div>

      <div className="pt-2 flex justify-between items-center gap-3">
        <Button
          variant="outline"
          className="w-full md:w-1/2 border-primary/20 hover:bg-primary hover:text-primary-foreground"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View on GitHub
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>

        <Button
          variant="default"
          className="w-1/2 hidden md:block"
          onClick={handleIssueInDb}
          disabled={btnLoading}
        >
          {btnLoading ? "Loading..." : "View on VS Code"}
        </Button>
      </div>
    </Card>
  );
};
