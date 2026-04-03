"use client";
import React, { useEffect, useState, use } from "react"; // Added 'use'
import { Avatar, AvatarImage } from "../../components/ui/avator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { IssueCard } from "../../components/IssueCard";
import { ContributionCard } from "../../components/ContributionCard";
import { Github, Mail, Calendar, Bookmark, GitPullRequest } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "@/app/components/ProfileLoadingSkeleton";

interface Contribution {
  id: number;
  title: string;
  repository: string;
  description: string;
  labels: string[];
  stars: number;
  url: string;
  status: "completed" | "in-progress" | "pending";
  isBookmarked: boolean;
  contributedAt: string;
}

interface Bookmarked {
  itemId: number;
  id?: number; // Added to support potential variations in API response
  title: string;
  repository: string;
  description: string;
  labels?: string[];
  stars: number;
  url: string;
  isBookmarked: boolean;
}

const formatDate = (gmtformat: string | undefined) => {
  if (!gmtformat) return "N/A";
  const date = new Date(gmtformat);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

interface PageProps {
  params: Promise<{ user: string }>;
}

const redirectGithub = (username?: string) => {
  if (!username) return;
  window.location.href = `https://github.com/${username}`;
};

const Profile = ({ params }: PageProps) => {
  // Unwrapping params using React.use() for Next.js 15 compatibility
  const resolvedParams = use(params);
  const userIdFromParams = resolvedParams.user;

  const { user: loggedInUser, loading } = useAuth();
  const router = useRouter();

  const [resLoading, setResLoading] = useState(true); // Default to true if fetching on mount
  const [bookmarkedIssues, setBookmarkedIssues] = useState<Bookmarked[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookmarkRes, contributionRes] = await Promise.all([
          fetch(`/api/bookmarks?userId=${userIdFromParams}`),
          fetch(`/api/user/contributions?userId=${userIdFromParams}`)
        ]);

        const bookmarkData = await bookmarkRes.json();
        const contributionData = await contributionRes.json();

        setBookmarkedIssues(bookmarkData.bookmarks || []);
        setContributions(contributionData.contributions || []);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setResLoading(false);
      }
    };

    if (userIdFromParams) {
      fetchData();
    }
  }, [userIdFromParams]);

  // Derived state
  const completedCount = contributions?.filter(c => c.status === "completed").length || 0;
  const inProgressCount = contributions?.filter(c => c.status === "in-progress").length || 0;
  const pendingCount = contributions?.filter(c => c.status === "pending").length || 0;

  // Type-casting for Firebase-specific properties that aren't in the base User type
  const firebaseUser = loggedInUser as any;
  const githubUsername = firebaseUser?.reloadUserInfo?.screenName || "";

  if (!loading && !loggedInUser) {
    router.push('/');
    return null;
  }

  if (loading || resLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="py-8 space-y-8 px-10">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <Avatar className="h-24 w-24 mx-auto md:mx-0">
                <AvatarImage src={loggedInUser?.photoURL || ""} />
              </Avatar>

              <div className="flex-1 space-y-3">
                <div
                  onClick={() => redirectGithub(githubUsername)}
                  className="cursor-pointer flex flex-col items-center md:items-start"
                >
                  <CardTitle className="text-3xl">
                    {loggedInUser?.displayName || "Anonymous User"}
                  </CardTitle>

                  <CardDescription className="flex flex-col sm:flex-row flex-wrap items-center md:items-start justify-center md:justify-start gap-2 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {loggedInUser?.email}
                    </span>

                    {githubUsername && (
                      <span className="flex items-center gap-1 cursor-pointer">
                        <Github className="h-4 w-4" />
                        @{githubUsername}
                      </span>
                    )}

                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {formatDate(loggedInUser?.metadata?.creationTime)}
                    </span>
                  </CardDescription>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-6 md:gap-8 w-full md:w-auto">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{contributions.length}</p>
                  <p className="text-xs text-muted-foreground">Contributions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCount}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{bookmarkedIssues.length}</p>
                  <p className="text-xs text-muted-foreground">Bookmarked</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="contributions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="contributions" className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4" />
              My Contributions
              <Badge variant="secondary" className="ml-1">{contributions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Bookmarked
              <Badge variant="secondary" className="ml-1">{bookmarkedIssues.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitPullRequest className="h-5 w-5 text-primary" />
                  My Contributions
                </CardTitle>
                {/* ... (rest of the content remains same) */}
              </CardHeader>
              <CardContent>
                {contributions.length > 0 ? (
                  <div className="grid gap-4">
                    {contributions.map((contribution) => (
                      <ContributionCard key={contribution.id} {...contribution} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <GitPullRequest className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No contributions yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary" />
                  Bookmarked Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookmarkedIssues.length > 0 ? (
                  <div className="grid gap-4">
                    {bookmarkedIssues.map((b) => (
                      <IssueCard
                        key={b.itemId || b.id}
                        id={Number(b.itemId || b.id)}
                        title={b.title}
                        repository={b.repository}
                        description={b.description}
                        labels={b.labels || []}
                        stars={b.stars}
                        url={b.url}
                        isBookmarked={true}
                        onBookmarkToggle={() =>
                          setBookmarkedIssues((prev) =>
                            prev.filter((x) => String(x.itemId) !== String(b.itemId))
                          )
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bookmarked issues yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;