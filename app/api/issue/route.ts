interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: {
    name: string;
    color: string;
  }[];
  created_at: string;
  updated_at: string;
  comments: number;
}

export async function getGoodFirstIssue(
    owner: string,
    repo: string,
    page: number = 1,
    perPage: number = 10,
): Promise<Issue[]>{ 

    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open&labels=good%20first%20issue&per_page=${perPage}&page=${page}`;

    const res = await fetch(url, {
        headers: {
            Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
    });
     
    if(!res.ok) {
        console.error("GitHub API Error:", await res.text());
        return [];
    }

    const data : Issue[] = await res.json();
    return data;
}