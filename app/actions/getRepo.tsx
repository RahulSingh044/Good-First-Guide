import { getFilteredRepos } from "../api/search/route";

export interface IssuesResponse {
  issues: {
    id: number;
    title: string;
    html_url: string;
    state: string;
    user: { login: string; avatar_url: string };
    labels: { name: string; color: string }[];
    repository: string;
    description: string;
    stars: number;
    url: string;
  }[];
  pagination: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
  totalSearchResults: number;
}

export const fetchIssues = async (
  topics: string[] = [],
  page: number = 1,
  perPage: number = 10
): Promise<IssuesResponse> => {
  const res = await getFilteredRepos(topics, page, perPage);

  const issues = res.issues.map((issue: any) => ({
    ...issue,
    url: issue.html_url,
    description: issue.description || "No description available",
  }));

  return {
    issues,
    pagination: res.pagination,
    totalSearchResults: res.pagination.total,
  };
};
