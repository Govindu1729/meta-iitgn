import prepmatData from "@/data/prepmat.json";

export interface PrepMatItem {
  id: string;
  year: string;
  type: string;
  subType?: string;
  company: string;
  title: string;
  url: string;
  description?: string;
  domain?: string;
}

/**
 * Fetch prepmat resources. Currently loaded from bundled JSON,
 * ready to swap with backend endpoint when available:
 * e.g., const res = await api.get('/prepmat'); return res.data.data;
 */
export async function getPrepMatResources(): Promise<PrepMatItem[]> {
  // Simulating async getter for seamless future backend transition
  return prepmatData as PrepMatItem[];
}
