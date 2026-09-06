export interface CategoryDef {
  slug: string;
  name: string;
  description: string;
  icon: string; // Font Awesome icon key (see icon-map.tsx)
  color: "yellow" | "green" | "pink" | "blue" | "purple";
  seoKeywords: string[];
}

export const categories: CategoryDef[] = [
  {
    slug: "anime",
    name: "Anime & Manga",
    description:
      "Real, free APIs for anime, manga, waifu images, quotes and Japanese pop-culture data.",
    icon: "faDragon",
    color: "pink",
    seoKeywords: ["anime api", "manga api", "waifu api", "anilist api", "jikan api", "otaku developer tools"],
  },
  {
    slug: "gaming",
    name: "Gaming",
    description:
      "Free game data APIs — Steam, Riot Games, Pokémon, chess, esports stats and more.",
    icon: "faGamepad",
    color: "green",
    seoKeywords: ["gaming api", "steam api", "riot games api", "pokemon api", "esports api", "video game developer tools"],
  },
  {
    slug: "movies-tv",
    name: "Movies & TV",
    description:
      "Metadata, ratings info and streaming data APIs for films, series and actors.",
    icon: "faFilm",
    color: "yellow",
    seoKeywords: ["movies api", "tv show api", "tmdb api", "omdb api", "streaming data api"],
  },
  {
    slug: "technology",
    name: "Technology & Dev Tools",
    description:
      "The core developer toolbox — cloud, DevOps, hosting, dev-productivity and infra APIs.",
    icon: "faMicrochip",
    color: "blue",
    seoKeywords: ["developer api", "devops api", "cloud api", "programming api", "rest api directory"],
  },
  {
    slug: "sports",
    name: "Sports",
    description:
      "Live scores, fixtures, standings and stats APIs across football, cricket, basketball and more.",
    icon: "faFutbol",
    color: "green",
    seoKeywords: ["sports api", "football api", "cricket api", "nba api", "live score api"],
  },
  {
    slug: "music",
    name: "Music & Audio",
    description:
      "Music metadata, lyrics, streaming and audio-analysis APIs from the world's biggest catalogs.",
    icon: "faMusic",
    color: "purple",
    seoKeywords: ["music api", "spotify api", "lyrics api", "audio api", "song data api"],
  },
  {
    slug: "finance",
    name: "Finance & Crypto",
    description:
      "Stocks, forex, banking and cryptocurrency market-data APIs for fintech builders.",
    icon: "faCoins",
    color: "yellow",
    seoKeywords: ["finance api", "crypto api", "stock market api", "forex api", "banking api"],
  },
  {
    slug: "ai-ml",
    name: "AI & Machine Learning",
    description:
      "Open and freemium AI APIs for text, vision, speech and generative models.",
    icon: "faBrain",
    color: "pink",
    seoKeywords: ["ai api", "machine learning api", "nlp api", "computer vision api", "generative ai api"],
  },
  {
    slug: "science-space",
    name: "Science & Space",
    description:
      "NASA, astronomy, physics and open research data APIs for curious builders.",
    icon: "faSatellite",
    color: "blue",
    seoKeywords: ["nasa api", "space api", "science api", "astronomy api", "open research data"],
  },
  {
    slug: "news-media",
    name: "News & Media",
    description:
      "Headlines, articles and media metadata APIs from newsrooms around the globe.",
    icon: "faNewspaper",
    color: "green",
    seoKeywords: ["news api", "media api", "headlines api", "journalism api"],
  },
  {
    slug: "weather-nature",
    name: "Weather & Nature",
    description:
      "Forecasts, climate, air-quality and natural-disaster data APIs.",
    icon: "faCloudSun",
    color: "purple",
    seoKeywords: ["weather api", "climate api", "air quality api", "earthquake api"],
  },
  {
    slug: "lifestyle",
    name: "Lifestyle & Entertainment (18+)",
    description:
      "Safe-for-work lifestyle, dating, astrology and entertainment APIs curated for mature audiences. No explicit content is listed.",
    icon: "faHeart",
    color: "pink",
    seoKeywords: ["lifestyle api", "dating api", "astrology api", "entertainment api", "18+ developer tools"],
  },
];

export function getCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}
