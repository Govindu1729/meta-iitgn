"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  RefreshCw,
  Clock,
  Calendar,
  Shuffle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Newspaper,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface HomeStatsNewProps {
  pageCount?: number | null;
  newPages?: any[];
  updatedPages?: any[];
  pendingPages?: any[];
  newsPages?: any[];
  popularPages?: any[];
  upcomingEvents?: any[];
  getRelativeTime?: (dateString: string) => string;
  onOpenNewPages?: () => void;
  onOpenUpdatedPages?: () => void;
  onOpenPendingPages?: () => void;
  onOpenNews?: () => void;
  onOpenEvents?: () => void;
  onRandomPage?: () => void;
}

export default function HomeStatsNew({
  pageCount,
  newPages = [],
  updatedPages = [],
  pendingPages = [],
  newsPages = [],
  popularPages = [],
  upcomingEvents = [],
  getRelativeTime = (d: string) => d,
  onOpenNewPages,
  onOpenUpdatedPages,
  onOpenPendingPages,
  onOpenNews,
  onOpenEvents,
  onRandomPage,
}: HomeStatsNewProps) {
  const router = useRouter();
  const { user } = useAuth();

  // Role check: Only admin or moderator sees the moderation/pending review tool
  const isAdminOrMod = Boolean(
    user?.role &&
      (user.role.toLowerCase() === "admin" ||
        user.role.toLowerCase() === "moderator")
  );

  const handleRandomPage = () => {
    if (onRandomPage) {
      onRandomPage();
      return;
    }
    const candidates = [...newPages, ...updatedPages].filter(Boolean);
    if (candidates.length > 0) {
      const randomItem = candidates[Math.floor(Math.random() * candidates.length)];
      const cat = (randomItem.metadata as any)?.category || "campus";
      router.push(`/wiki/${cat}/${randomItem.slug}`);
      return;
    }
    router.push("/wiki/page/campuses-and-surroundings");
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base sm:text-lg font-black tracking-tight text-base-content flex items-center gap-2">
            <span>Wiki Highlights & Tools</span>
          </h2>
        </div>
      </div>

      {/* Grid of 4 Live Wiki Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. NEW PAGES VIEW */}
        <div className="rounded-2xl bg-base-100 border border-base-200/90 hover:border-base-300 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-base-200/60 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-base-content leading-tight">
                    New Pages
                  </h3>
                  <span className="text-[10px] text-base-content/50">
                    Latest creations
                  </span>
                </div>
              </div>
              <span className="badge badge-sm badge-info badge-outline font-semibold text-[10px]">
                {newPages.length} recent
              </span>
            </div>

            {/* List Preview */}
            <div className="space-y-2 min-h-[92px]">
              {newPages.length === 0 ? (
                <div className="py-6 text-center text-xs text-base-content/50">
                  No new pages created yet.
                </div>
              ) : (
                newPages.slice(0, 3).map((page: any) => {
                  const cat = (page.metadata as any)?.category || "campus";
                  return (
                    <Link
                      key={page.page_id || page.slug}
                      href={`/wiki/${cat}/${page.slug}`}
                      className="group flex items-center justify-between p-1.5 rounded-lg hover:bg-base-200/60 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-xs font-semibold text-base-content/90 truncate group-hover:text-primary transition-colors">
                          {page.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-base-content/50 shrink-0 ml-2">
                        {page.created_at ? getRelativeTime(page.created_at) : "new"}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onOpenNewPages}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All New Pages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. UPDATED PAGES VIEW */}
        <div className="rounded-2xl bg-base-100 border border-base-200/90 hover:border-base-300 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-base-200/60 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-base-content leading-tight">
                    Updated Pages
                  </h3>
                  <span className="text-[10px] text-base-content/50">
                    Recent edits
                  </span>
                </div>
              </div>
              <span className="badge badge-sm badge-success badge-outline font-semibold text-[10px]">
                {updatedPages.length} edits
              </span>
            </div>

            {/* List Preview */}
            <div className="space-y-2 min-h-[92px]">
              {updatedPages.length === 0 ? (
                <div className="py-6 text-center text-xs text-base-content/50">
                  No pages updated yet.
                </div>
              ) : (
                updatedPages.slice(0, 3).map((page: any) => {
                  const cat = (page.metadata as any)?.category || "campus";
                  return (
                    <Link
                      key={page.page_id || page.slug}
                      href={`/wiki/${cat}/${page.slug}`}
                      className="group flex items-center justify-between p-1.5 rounded-lg hover:bg-base-200/60 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-xs font-semibold text-base-content/90 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {page.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-base-content/50 shrink-0 ml-2">
                        {page.updated_at
                          ? getRelativeTime(page.updated_at)
                          : page.created_at
                            ? getRelativeTime(page.created_at)
                            : "recently"}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onOpenUpdatedPages}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All Edits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. CONDITIONAL TOOL: PENDING REVIEWS (FOR ADMINS) vs CAMPUS NEWS (FOR NORMAL USERS) */}
        {isAdminOrMod ? (
          /* FOR ADMINS/MODERATORS: PENDING REVIEWS QUEUE */
          <div className="rounded-2xl bg-base-100 border border-base-200/90 hover:border-base-300 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-base-200/60 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-base-content leading-tight">
                      Pending Review
                    </h3>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                      Moderator Queue
                    </span>
                  </div>
                </div>
                <span
                  className={`badge badge-sm font-semibold text-[10px] ${
                    pendingPages.length > 0 ? "badge-warning" : "badge-ghost"
                  }`}
                >
                  {pendingPages.length} pending
                </span>
              </div>

              {/* List or Status Preview */}
              <div className="min-h-[92px] flex flex-col justify-center">
                {pendingPages.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-base-content/75 font-medium leading-relaxed">
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {pendingPages.length} page{pendingPages.length === 1 ? "" : "s"}
                      </span>{" "}
                      awaiting approval from the moderation queue.
                    </p>
                    <div className="space-y-1">
                      {pendingPages.slice(0, 2).map((page: any) => (
                        <div
                          key={page.page_id || page.slug}
                          className="text-[11px] text-base-content/80 truncate px-2 py-1 rounded bg-base-200/50 font-medium"
                        >
                          • {page.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2 text-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500/80 mb-1" />
                    <div className="text-xs font-bold text-base-content">
                      All Caught Up
                    </div>
                    <div className="text-[11px] text-base-content/50">
                      No edits pending moderation
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onOpenPendingPages}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Review Pending Changes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* FOR NORMAL STUDENTS/USERS: CAMPUS NEWS & ANNOUNCEMENTS */
          <div className="rounded-2xl bg-base-100 border border-base-200/90 hover:border-base-300 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-base-200/60 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 flex items-center justify-center shrink-0">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-base-content leading-tight">
                      Campus News
                    </h3>
                    <span className="text-[10px] text-base-content/50">
                      Bulletins & updates
                    </span>
                  </div>
                </div>
                <span className="badge badge-sm badge-secondary badge-outline font-semibold text-[10px]">
                  {newsPages.length > 0 ? `${newsPages.length} notices` : "Updates"}
                </span>
              </div>

              {/* List Preview */}
              <div className="space-y-2 min-h-[92px]">
                {newsPages.length > 0 ? (
                  newsPages.slice(0, 3).map((item: any, idx: number) => (
                    <div
                      key={item.news_id || idx}
                      onClick={onOpenNews}
                      className="group flex items-center justify-between p-1.5 rounded-lg hover:bg-base-200/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        <span className="text-xs font-semibold text-base-content/90 truncate group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-base-content/50 shrink-0 ml-2">
                        {item.created_at ? getRelativeTime(item.created_at) : "recent"}
                      </span>
                    </div>
                  ))
                ) : popularPages.length > 0 ? (
                  popularPages.slice(0, 3).map((pop: any) => {
                    const cat = (pop.metadata as any)?.category || "campus";
                    return (
                      <Link
                        key={pop.page_id || pop.slug}
                        href={`/wiki/${cat}/${pop.slug}`}
                        className="group flex items-center justify-between p-1.5 rounded-lg hover:bg-base-200/60 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <TrendingUp className="w-3 h-3 text-violet-500 shrink-0" />
                          <span className="text-xs font-semibold text-base-content/90 truncate group-hover:text-primary transition-colors">
                            {pop.title}
                          </span>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="py-6 text-center text-xs text-base-content/50">
                    No new announcements right now.
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onOpenNews}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View All Campus News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 4. DISCOVERY & CAMPUS RADAR */}
        <div className="rounded-2xl bg-base-100 border border-base-200/90 hover:border-base-300 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-base-200/60 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <Shuffle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-base-content leading-tight">
                    Campus Radar
                  </h3>
                  <span className="text-[10px] text-base-content/50">
                    Quick Discovery
                  </span>
                </div>
              </div>
              <span className="badge badge-sm badge-secondary badge-outline font-semibold text-[10px]">
                Explore
              </span>
            </div>

            {/* Quick Actions Stack */}
            <div className="space-y-2 min-h-[92px]">
              {/* Random Page Button */}
              <button
                type="button"
                onClick={handleRandomPage}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Shuffle className="w-3.5 h-3.5 text-purple-500 group-hover:rotate-45 transition-transform shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-base-content truncate group-hover:text-primary transition-colors">
                      Random Page
                    </div>
                    <div className="text-[10px] text-base-content/50 truncate">
                      Serendipitous wiki dive
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-base-content/40 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
              </button>

              {/* Upcoming Events Button */}
              <button
                type="button"
                onClick={onOpenEvents}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-base-content truncate group-hover:text-rose-500 transition-colors">
                      Fests & Events
                    </div>
                    <div className="text-[10px] text-base-content/50 truncate">
                      {upcomingEvents.length > 0
                        ? `${upcomingEvents.length} upcoming events`
                        : "Campus calendar"}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-base-content/40 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onOpenEvents}
            className="mt-3 w-full py-2 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Events Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
