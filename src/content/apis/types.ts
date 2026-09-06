export interface ApiEntry {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  baseUrl: string;
  docsUrl: string;
  authType: "No" | "apiKey" | "OAuth" | "X-Mashape-Key" | "User-Agent";
  https: boolean;
  cors: "Yes" | "No" | "Unknown";
  isTestable: boolean;
  tags: string[];
  sourceListUrl: string;
}

export const OPEN_SOURCE_LIST_SOURCE =
  "https://github.com/public-apis/public-apis";
