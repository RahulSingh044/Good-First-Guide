"use client";
import React from "react";
import { Avatar, AvatarImage } from "../../components/ui/avator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { IssueCard } from "../../components/IssueCard";
import { ContributionCard } from "../../components/ContributionCard";
import { Github, Mail, Calendar, Bookmark, GitPullRequest } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import ProfileSkeleton from "@/app/components/ProfileLoadingSkeleton";

interface Contribution {
  id: number,
  title: string,
  repository: string,
  description: string,
  labels: string[],
  stars: number,
  url: string,
  status: "completed" | "in-progress" | "pending",
  isBookmarked: boolean,
  contributedAt: string;
}

interface Bookmarked {
  itemId: number,
  title: string,
  repository: string,
  description: string,
  labels?: string[],
  stars: number,
  url: string,
  isBookmarked: boolean,
}

const formatDate = (gmtformat: string = "") => {
  const date = new Date(gmtformat);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface PageProps {
  params: Promise<{ user: string }>;
}

const redirectGithub = (user: String = "") => {
  const redirectLink = `https://github.com/${user}`;
  window.location.href = redirectLink;
}

const Profile = ({ params }: PageProps) => {

  const p = React.use(params);
  const user = p.user;
  const { user: loggedInUser, loading } = useAuth();
  const router = useRouter();
  const [bookmarkedIssues, setBookmarkedIssues] = useState<Bookmarked[]>([])

  useEffect(() => {
    const getBookmarkIssues = async () => {
      const res = await axios.get(`/api/bookmarks?userId=${user}`);
      setBookmarkedIssues(res.data.bookmarks)
      console.log("res from profile", res.data);
    }

    getBookmarkIssues()
  }, [user])

  //Contributions
  const contributions: Contribution[] = [];

  const completedCount = contributions.filter(c => c.status === "completed").length;
  const inProgressCount = contributions.filter(c => c.status === "in-progress").length;
  const pendingCount = contributions.filter(c => c.status === "pending").length;

  if (!loading && !loggedInUser) {
    router.push('/');
  }

  if(loading){
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8 px-10">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={loggedInUser?.photoURL} />
              </Avatar>

              <div className="flex-1 space-y-3">
                <div
                  onClick={() => redirectGithub(loggedInUser.reloadUserInfo?.screenName)}
                  className="cursor-pointer"
                >
                  <CardTitle className="text-3xl">{loggedInUser?.displayName}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {loggedInUser?.email}
                    </span>
                    <span className="flex items-center gap-1 cursor-pointer">
                      <Github className="h-4 w-4" />
                      @{loggedInUser?.reloadUserInfo?.screenName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {formatDate(loggedInUser?.metadata?.creationTime)}
                    </span>
                  </CardDescription>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{contributions.length}</p>
                  <p className="text-xs text-muted-foreground">Contributions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCount}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{bookmarkedIssues?.length}</p>
                  <p className="text-xs text-muted-foreground">Bookmarked</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs for Bookmarks and Contributions */}
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
              <Badge variant="secondary" className="ml-1">{bookmarkedIssues?.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitPullRequest className="h-5 w-5 text-primary" />
                  My Contributions
                </CardTitle>
                <CardDescription className="flex flex-wrap gap-4">
                  <span>Track the status of issues you've contributed to</span>
                  <div className="flex gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {completedCount} Completed
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      {inProgressCount} In Progress
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {pendingCount} Pending
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contributions.length > 0 ? (
                  <div className="grid gap-4 min-h-screen">
                    {contributions.map((contribution) => (
                      <ContributionCard key={contribution?.id} {...contribution} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <GitPullRequest className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No contributions yet</p>
                    <p className="text-sm mt-2">Start contributing to open source projects!</p>
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
                <CardDescription>
                  Issues you've saved for later contribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookmarkedIssues?.length > 0 ? (
                  <div className="grid gap-4">
                    {bookmarkedIssues.map((b: any) => (
                      <IssueCard
                        key={b._id ?? b.itemId}
                        id={Number(b.itemId ?? b.id)}
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
                    <p className="text-sm mt-2">Start exploring and bookmark issues you'd like to work on!</p>
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
