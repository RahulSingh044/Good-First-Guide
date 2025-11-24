"use client";
import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Search } from 'lucide-react'
import { SkillSelector } from '../components/SkillSelector'
import { IssueCard } from '../components/IssueCard'

interface Issue {
  id: number;
  title: string;
  repository: string;
  description: string;
  labels: string[];
  stars: number;
  url: string;
  isBookmarked?: boolean;
}

const mockIssues: Issue[] = [];

function Exploring() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIssues, setBookmarkedIssues] = useState<number[]>([]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredIssues = mockIssues.filter((issue) => {
    const lowerQuery = searchQuery.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      issue?.title?.toLowerCase().includes(lowerQuery) ||
      issue?.description?.toLowerCase().includes(lowerQuery) ||
      issue?.labels?.some((label) =>
        label.toLowerCase().includes(lowerQuery)
      );

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) =>
        issue?.labels?.some((label) =>
          label.toLowerCase().includes(skill.toLowerCase())
        )
      );

    return matchesSearch && matchesSkills;
  });


  return (
    <section id="explore" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Explore <span className="text-primary">Issues</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Filter by your skills and search for issues that match your interests
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by keywords (e.g., 'authentication', 'API', 'frontend')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg shadow-lg rounded-4xl"
          />
        </div>

        <SkillSelector
          selectedSkills={selectedSkills}
          onSkillToggle={handleSkillToggle}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {filteredIssues.length !== 0 ? (
              <h3 className="text-2xl font-semibold">
                {filteredIssues.length}Issues Found
              </h3>
            ) : (
              <h3 className="text-2xl font-semibold">

              </h3>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredIssues.length === 0 ? (
              <p className="w-7xl text-center text-muted-foreground">No issues found matching your criteria.</p>
            ) : (
              filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  {...issue}
                  isBookmarked={bookmarkedIssues.includes(issue.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Exploring