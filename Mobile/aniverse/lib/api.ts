import { BACKEND_URL } from "./config";

// Direct backend connections
const BASE = BACKEND_URL;

export async function fetchHomeFeed(): Promise<{ results: any[] }> {
  const res = await fetch(`${BASE}/youtube/v1/home`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: null }),
  });
  return res.json();
}

export async function fetchLeaderboards(): Promise<any> {
  const res = await fetch(`${BASE}/leaderboards`);
  return res.json();
}

export async function fetchUpdates(): Promise<any> {
  const res = await fetch(`${BASE}/news`);
  return res.json();
}

export async function fetchManhwas(): Promise<any[]> {
  const res = await fetch(`${BASE}/readings/manhwas`);
  return res.json();
}

export async function fetchLightNovels(): Promise<any[]> {
  const res = await fetch(`${BASE}/readings/light-novels`);
  return res.json();
}

export async function fetchSearch(query: string): Promise<{ results: any[] }> {
  const res = await fetch(
    `${BASE}/youtube/v1/search/${encodeURIComponent(query)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: null }),
    }
  );
  return res.json();
}

export async function fetchSimilarVideos(
  title: string
): Promise<{ results: any[] }> {
  const res = await fetch(
    `${BASE}/youtube/v1/search/${encodeURIComponent(title.split(" ")[0])}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: null }),
    }
  );
  return res.json();
}
