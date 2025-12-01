"use client";
import { Avatar, AvatarImage } from "../../components/ui/avator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { IssueCard } from "../../components/IssueCard";
import { ContributionCard } from "../../components/ContributionCard";
import { Github, Mail, Calendar, Bookmark, GitPullRequest } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";
import ProfileSkeleton from "@/app/components/ProfileLoadingSkeleton";

interface Contribution {
  id: Number,
  title: String,
  repository: String,
  description: String,
  labels: String[],
  stars: Number,
  status: String,
  url: String,
  isBookmarked: boolean,
}

interface Bookmarked {
  id: Number,
  title: String,
  repository: String,
  description: String,
  labels: String[],
  stars: Number,
  url: String,
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

const redirectGithub = (user: String = "") => {
  const redirectLink = `https://github.com/${user}`;
  window.location.href = redirectLink;
}

const Profile = () => {

  const { user } = useAuth();

  useEffect(() => {
    if(user)
      console.log("User info:", user);
  },[user]);

  if (!user) {
    return (
      <>
        <ProfileSkeleton />
      </>
    )
  }

  //Bookmarked issues
  const bookmarkedIssues: Bookmarked[] = [];

  //Contributions
  const contributions: Contribution[] = [];

  const completedCount = contributions.filter(c => c.status === "completed").length;
  const inProgressCount = contributions.filter(c => c.status === "in-progress").length;
  const pendingCount = contributions.filter(c => c.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8 px-10">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.photoURL} />
              </Avatar>

              <div className="flex-1 space-y-3">
                <div 
                onClick={() => redirectGithub(user.reloadUserInfo?.screenName)}
                className="cursor-pointer"
                >
                  <CardTitle className="text-3xl">{user.displayName}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </span>
                    <span className="flex items-center gap-1 cursor-pointer">
                      <Github className="h-4 w-4" />
                      @{user.reloadUserInfo?.screenName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {formatDate(user.metadata?.creationTime)}
                    </span>
                  </CardDescription>
                </div>

                {/* <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div> */}
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
                  <p className="text-2xl font-bold text-primary">{bookmarkedIssues.length}</p>
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
                      <ContributionCard key={contribution.id} {...contribution} />
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
                {bookmarkedIssues.length > 0 ? (
                  <div className="grid gap-4">
                    {bookmarkedIssues.map((issue) => (
                      <IssueCard key={issue.id} {...issue} />
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
