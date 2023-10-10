export async function getRepoMainActivity() {
    const owner = import.meta.env.VITE_GITHUB_OWNER;
    const repo = import.meta.env.VITE_GITHUB_REPO;

    const API_BASE_URL = 'https://api.github.com';
    const url = `${API_BASE_URL}/repos/${owner}/${repo}/commits?branch=main`;

    const response = await fetch(url, {
        headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    const data = await response.json();
    return data[0].commit.author.date;
}
