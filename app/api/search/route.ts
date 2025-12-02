import { searchRepos } from "../repo/route";
import { getGoodFirstIssue } from "../issue/route";

export async function getFilteredRepos(
  topics: string[] = [],
  page: number = 1,
  perPage: number = 10
) {
  const repoData = await searchRepos(topics, page, perPage);

  const flattenedIssues: any[] = [];

  for (const repo of repoData.items) {
    const issues = await getGoodFirstIssue(
      repo.owner.login,
      repo.name,
      1,
      50
    );

    issues.forEach((issue) => {
      flattenedIssues.push({
        ...issue,
        repository: repo.full_name,
        description: repo.description,
        stars: repo.stargazers_count,
      });
    });
  }

  return {
    issues: flattenedIssues,
    pagination: {
      total: repoData.total_count,
      page,
      perPage,
      totalPages: Math.ceil(repoData.total_count / perPage),
    },
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const topics = searchParams.get("topics")
      ? searchParams.get("topics")!.split(",")
      : [];

    const page = Number(searchParams.get("page") ?? 1);
    const perPage = Number(searchParams.get("perPage") ?? 10);

    const result = await getFilteredRepos(topics, page, perPage);

    return Response.json(result);
  } catch (error) {
    return Response.json(error);
  }
}
