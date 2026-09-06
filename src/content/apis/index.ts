import type { ApiEntry } from "./types";
import { animeApis } from "./anime";
import { gamingApis } from "./gaming";
import { moviesTvApis } from "./movies-tv";
import { technologyApis } from "./technology";
import { sportsApis } from "./sports";
import { musicApis } from "./music";
import { financeApis } from "./finance";
import { aiMlApis } from "./ai-ml";
import { scienceSpaceApis } from "./science-space";
import { newsMediaApis } from "./news-media";
import { weatherNatureApis } from "./weather-nature";
import { lifestyleApis } from "./lifestyle";

export interface CategorizedApiEntry extends ApiEntry {
  categorySlug: string;
}

export const apisByCategory: Record<string, ApiEntry[]> = {
  anime: animeApis,
  gaming: gamingApis,
  "movies-tv": moviesTvApis,
  technology: technologyApis,
  sports: sportsApis,
  music: musicApis,
  finance: financeApis,
  "ai-ml": aiMlApis,
  "science-space": scienceSpaceApis,
  "news-media": newsMediaApis,
  "weather-nature": weatherNatureApis,
  lifestyle: lifestyleApis,
};

export const allApis: CategorizedApiEntry[] = Object.entries(apisByCategory).flatMap(
  ([categorySlug, entries]) => entries.map((entry) => ({ ...entry, categorySlug })),
);

export function getApisForCategory(categorySlug: string): ApiEntry[] {
  return apisByCategory[categorySlug] ?? [];
}

export function findApiBySlug(categorySlug: string, slug: string): CategorizedApiEntry | undefined {
  return allApis.find((api) => api.categorySlug === categorySlug && api.slug === slug);
}

export const totalApiCount = allApis.length;
