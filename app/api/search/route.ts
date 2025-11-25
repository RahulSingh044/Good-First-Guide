import { searchRepos } from "../repo/route";
import { getGoodFirstIssue } from "../issue/route";

interface Repo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics?: string[];
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    state: string;
    user: { login: string; avatar_url: string };
    labels: { name: string; color: string }[];
}

interface IssueError {
    success: false;
    error: string;
}

interface SearchReposResponse {
    total_count: number;
    items: Repo[];
}

interface FilteredRepo {
    repo: Repo;
    issues: Issue[];
}

export interface FilteredReposResponse {
    repos: FilteredRepo[];
    pagination: {
        total: number;
        page: number;
        perPage: number;
        totalPages: number;
    };
}


export async function getFilteredRepos(
    topic: string[],
    page: number = 1,
): Promise<FilteredReposResponse> {

    const perPage = 10;

    const repoData: SearchReposResponse = await searchRepos(topic, page, perPage);
    console.log(repoData);

    const final: FilteredRepo[] = [];

    for (const repo of repoData.items) {

        const issues: Issue[] = await getGoodFirstIssue(repo.owner.login, repo.name, page, perPage);

        final.push({
            repo, issues
        });

    }

    return {
        repos: final,
        pagination: {
            total: repoData.total_count,
            page,
            perPage,
            totalPages: Math.ceil(repoData.total_count / perPage),
        },
    };

}