interface SearchReposResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
}

interface Repository {
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
        html_url: string;
    };
}

export async function searchRepos(
    topics: string[] = [],
    page: number = 1,
    perPage: number = 10
): Promise<SearchReposResponse> {

    const topicQuery = topics.length > 0
        ? topics.map(topic => `topic:${encodeURIComponent(topic)}`).join('+')
        : '';

    let query = ""
    if (topicQuery) {
        query += `+${topicQuery}`;
    }

    const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${perPage}&page=${page}`;

    const res = await fetch(url, {
        headers: {
            Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
    })

    if (!res.ok) {
        console.error("GitHub API Error:", await res.text());
        return {
            total_count: 0,
            incomplete_results: false,
            items: [],
        };
    }

    const data: SearchReposResponse = await res.json();
    return data;
}