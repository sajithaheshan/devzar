"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";
import { Badge } from "./badge";

const slides = [
  {
    image: "/images/hero-anime-gaming.jpg",
    eyebrow: "Anime + Gaming APIs",
    title: "Every Anime & Gaming API In One Place",
    description: "Jikan, AniList, PokéAPI, Steam and 40+ more real, verified endpoints.",
    href: "/categories/anime",
    cta: "Browse Anime & Gaming",
  },
  {
    image: "/images/hero-tech-code.jpg",
    eyebrow: "Developer Tools",
    title: "The Unstoppable Tech Stack, Documented",
    description: "GitHub, npm, Cloudflare, AI models — the infra powering the whole internet.",
    href: "/categories/technology",
    cta: "Explore Technology",
  },
  {
    image: "/images/hero-movies-sports.jpg",
    eyebrow: "Movies, TV & Sports",
    title: "Live Scores, Film Data & More — Free",
    description: "TMDB, TVmaze, football-data.org, balldontlie and dozens of real feeds.",
    href: "/categories/movies-tv",
    cta: "See Movies & Sports",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const id = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(id);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="brutal-box overflow-hidden bg-[var(--card-bg)]" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.href} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[360px] w-full sm:h-[440px] lg:h-[520px]">
                <Image src={slide.image} alt={slide.title} fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                  <Badge className="mb-4 w-fit text-white">
                    <Icon name="faFire" className="h-3 w-3" />
                    {slide.eyebrow}
                  </Badge>
                  <h2 className="max-w-xl text-3xl font-black leading-[1.05] text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">{slide.description}</p>
                  <Link
                    href={slide.href}
                    className="btn-glow mt-6 inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide"
                  >
                    {slide.cta}
                    <Icon name="faAnglesRight" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.href}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-2.5 w-8 border-2 border-[var(--border-color)] transition-colors ${
              i === selected ? "bg-[var(--color-yellow)]" : "bg-[var(--card-bg)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
