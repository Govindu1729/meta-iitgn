"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Play, Landmark, ArrowRight, Search } from "lucide-react";

interface HomeHeroNewProps {
  onExploreClick?: () => void;
  onTourClick?: () => void;
  onSearchFocus?: () => void;
}

export default function HomeHeroNew({
  onExploreClick,
  onTourClick,
  onSearchFocus,
}: HomeHeroNewProps) {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Shortcut Ctrl+K / Cmd+K to focus hero search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        onSearchFocus?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchFocus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchVal.trim();
    if (!query) return;
    router.push(`/search-results?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 group min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
      {/* Background IITGN Campus Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('/homepage_bg.png')` }}
      />

      {/* Dark Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
      <div className="absolute inset-0 bg-radial-at-tl from-indigo-900/30 via-transparent to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl space-y-4">

        {/* Big Heading */}
        <h1 className="text-5xl  lg:text-5xl xl:text-8xl font-black text-white tracking-tight leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            META IITGN
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed font-normal max-w-xl">
          A collaborative space where anyone on campus can read, write, and edit about IITGN —
          people, courses, clubs, events and everything in between.
        </p>

    

      </div>

      {/* Bottom-right Campus Card */}
      <div className="relative z-10 self-end mt-4">
        <Link
          href="https://en.wikipedia.org/wiki/IIT_Gandhinagar"
          target="blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/15 text-white shadow-xl transition-all group/card hover:translate-x-1"
        >
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/90 shrink-0">
            <Landmark className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-tight group-hover/card:text-indigo-300 transition-colors">
              Indian Institute of Technology Gandhinagar
            </div>
            <div className="text-[10px] text-white/60 leading-tight">
              Ideas • People • Community
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover/card:text-white group-hover/card:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </div>
  );
}
