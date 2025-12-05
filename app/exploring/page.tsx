"use client";
import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { IssueCard } from "../components/IssueCard";
import { SkillSelector } from "../components/SkillSelector";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { fetchIssues } from "../actions/getRepo";
import ExploreSkeleton from "../components/IssueExplorerSkeleton";

const IssueExplorer = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [issues, setIssues] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };


  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchIssues(selectedSkills, currentPage);

        setIssues(
          res.issues.map((issue: any) => ({
            ...issue,
            isBookmarked: bookmarks[issue.id] || false
          }))
        );
        setTotalPages(res.pagination.totalPages);
        setTotalResults(res.totalSearchResults);
      } catch (e) {
        console.error(e);
        setIssues([]);
      }
      setLoading(false);
    };

    load();
  }, [selectedSkills, currentPage]);

  return (
    <section className="py-20 px-4 bg-linear-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-7xl space-y-12">

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search issues"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg shadow-lg"
          />
        </div>

        <SkillSelector
          selectedSkills={selectedSkills}
          onSkillToggle={(skill) => {
            setSelectedSkills((prev) =>
              prev.includes(skill)
                ? prev.filter((s) => s !== skill)
                : [...prev, skill]
            );
            setCurrentPage(1);
          }}
        />

        {loading ? (
          <ExploreSkeleton />
        ) : (
          <>
            {/* <h3 className="text-2xl font-semibold">
              {issues.length} of {totalResults} Issues Found
            </h3> */}

            <div className="grid md:grid-cols-2 gap-6">
              {issues.map((issue) => (
                <IssueCard key={issue.id} {...issue} isBookmarked={bookmarks[issue.id] || false}
                  onBookmarkToggle={() => toggleBookmark(issue.id)} />
              ))}
            </div>

            {issues.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No issues found matching your criteria.
              </div>
            )}

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                  />

                  <PaginationItem>
                    Page {currentPage} of {totalPages}
                  </PaginationItem>

                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={
                      currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
                    }
                  />
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default IssueExplorer;
