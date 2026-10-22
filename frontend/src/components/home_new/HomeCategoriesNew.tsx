"use client";

import React from "react";
import Link from "next/link";
import {
  Users2,
  BookOpen,
  Landmark,
  Calendar,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  ArrowRight,
  PenTool,
  MessageSquare,
  FileSpreadsheet,
  Trophy,
} from "lucide-react";

interface HomeCategoriesNewProps {
  onOpenPortal?: (slug: string) => void;
  onOpenAllCategories?: () => void;
}

export default function HomeCategoriesNew({
  onOpenPortal,
  onOpenAllCategories,
}: HomeCategoriesNewProps) {
  const categories = [
    {
      id: "prepmat",
      title: "PrepMat",
      description: "400+ company resources & docs",
      icon: TrendingUp,
      href: "/prepmat",
      slug: "prepmat",
      isNew: true,
      isDirectRoute: true,
      bgGradient: "from-indigo-950 via-slate-900 to-cyan-950/80",
    },
    {
      id: "posts",
      title: "Posts",
      description: "Interviews, tips & community shares",
      icon: MessageSquare,
      href: "/interviews",
      slug: "interviews",
      isDirectRoute: true,
      bgGradient: "from-blue-950 via-indigo-950 to-slate-900",
    },
    {
      id: "blogs",
      title: "Blogs",
      description: "Stories, tech insights & campus voices",
      icon: PenTool,
      href: "/blog",
      slug: "blog",
      isDirectRoute: true,
      bgGradient: "from-purple-950 via-slate-900 to-indigo-950",
    },
    {
      id: "clubs",
      title: "Councils & Clubs",
      description: "Student bodies, tech & cult clubs",
      icon: Users2,
      href: "/wiki/clubs",
      slug: "clubs",
      bgGradient: "from-emerald-950/80 via-slate-900 to-teal-950/80",
    },
    {
      id: "fests",
      title: "Fests & Events",
      description: "Blithchron, Amalthea & summits",
      icon: Calendar,
      href: "/wiki/fests",
      slug: "fests",
      bgGradient: "from-rose-950/90 via-slate-900 to-purple-950/80",
    },
    {
      id: "competitions",
      title: "Competitions",
      description: "Hackathons, contests & wins",
      icon: Trophy,
      href: "/competitions",
      slug: "competitions",
      isDirectRoute: true,
      bgGradient: "from-amber-950/90 via-stone-900 to-orange-950/80",
    },
    {
      id: "student-life",
      title: "Student Life",
      description: "Hostels, mess, dining & amenities",
      icon: GraduationCap,
      href: "/wiki/student-life",
      slug: "student-life",
      bgGradient: "from-cyan-950/80 via-slate-900 to-blue-950/80",
    },
    {
      id: "off-campus",
      title: "Off-Campus",
      description: "Higher studies, GRE & internships",
      icon: Briefcase,
      href: "/wiki/off-campus",
      slug: "off-campus",
      bgGradient: "from-stone-950 via-neutral-900 to-zinc-900",
    },
  ];

  return (
    <section className="space-y-4 pt-2">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-base-content tracking-tight">
            Explore Wiki
          </h2>
        </div>

        {onOpenAllCategories && (
          <button
            onClick={onOpenAllCategories}
            className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Categories & Portals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={cat.href}
              onClick={(e) => {
                if (!cat.isDirectRoute && onOpenPortal) {
                  e.preventDefault();
                  onOpenPortal(cat.slug);
                }
              }}
              className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end p-4 text-white cursor-pointer"
            >
              {/* Background gradient & subtle texture */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} transition-transform duration-500 group-hover:scale-105`}
              />
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay group-hover:opacity-40 transition-opacity"
                style={{ backgroundImage: `url('/homepage_bg.png')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Card Content */}
              <div className="relative z-10 flex items-end justify-between gap-2">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-xs sm:text-sm leading-tight flex items-center gap-1.5 truncate">
                      <span className="truncate">{cat.title}</span>
                      {cat.isNew && (
                        <span className="badge badge-success badge-xs font-bold text-[9px] py-0.5 px-1.5 text-success-content shrink-0">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-white/60 truncate leading-tight mt-0.5">
                      {cat.description}
                    </div>
                  </div>
                </div>

                {/* Circular Arrow Button */}
                <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white group-hover:text-slate-900 text-white flex items-center justify-center shrink-0 transition-all border border-white/15">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
