interface GeneratePRProps {
    repo: string;
    diff: string;
    owner: string;
}

interface GeneratePRResponse {
    status: string;
    repo: string;
    pr_content: string;
}

export async function generatePR({
    repo,
    diff,
    owner,
}: GeneratePRProps): Promise<GeneratePRResponse> {
    const res = await fetch("https://344b4e39eeb4.ngrok-free.app/pr-gen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            repo,
            owner,
            diff,
        }),
    });

    console.log("res from model", res.body);

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Model API failed (${res.status}): ${errorText}`);
    }

    return res.json();
}
