"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Sidebar from "@/components/navs/Sidebar";
import BottomNavbar from "@/components/navs/BottomNavbar";
import AvatarIcon from "@/components/helpers/AvatarIcon";
import { Home, Bookmark, Search } from "lucide-react";
import HomeTopBarNew from "./HomeTopBarNew";
import HomeHeroNew from "./HomeHeroNew";
import HomeStatsNew from "./HomeStatsNew";
import HomeCategoriesNew from "./HomeCategoriesNew";

interface HomePageNewProps {
  activeTab: "home" | "search" | "bookmarks" | "profile";
  setActiveTab: (tab: "home" | "search" | "bookmarks" | "profile") => void;
  newPages?: any[];
  updatedPages?: any[];
  pendingPages?: any[];
  newsPages?: any[];
  popularPages?: any[];
  upcomingEvents?: any[];
  getRelativeTime?: (dateString: string) => string;
  onOpenPortal?: (slug: string) => void;
  onOpenAllCategories?: () => void;
  onOpenNewPages?: () => void;
  onOpenUpdatedPages?: () => void;
  onOpenPendingPages?: () => void;
  onOpenEvents?: () => void;
  onOpenNews?: () => void;
  onRandomPage?: () => void;
  searchComponent: React.ReactNode;
  bookmarksComponent: React.ReactNode;
  profileComponent: React.ReactNode;
}

export default function HomePageNew({
  activeTab,
  setActiveTab,
  newPages = [],
  updatedPages = [],
  pendingPages = [],
  newsPages = [],
  popularPages = [],
  upcomingEvents = [],
  getRelativeTime,
  onOpenPortal,
  onOpenAllCategories,
  onOpenNewPages,
  onOpenUpdatedPages,
  onOpenPendingPages,
  onOpenEvents,
  onOpenNews,
  onRandomPage,
  searchComponent,
  bookmarksComponent,
  profileComponent,
}: HomePageNewProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileNavHidden, setMobileNavHidden] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 8;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY < 10) {
        setMobileNavHidden(false);
      } else if (delta > threshold) {
        setMobileNavHidden(true);
      } else if (delta < -threshold) {
        setMobileNavHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileTabs = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        icon: Home,
        onClick: () => setActiveTab("home"),
      },
      {
        id: "bookmarks",
        label: "Bookmarks",
        icon: Bookmark,
        onClick: () => setActiveTab("bookmarks"),
      },
      {
        id: "profile",
        label: "Profile",
        icon: AvatarIcon,
        onClick: () => setActiveTab("profile"),
      },
    ],
    [setActiveTab]
  );

  return (
    <div className="min-h-screen w-full bg-base-200/25 flex flex-col lg:pl-72 xl:pl-80 font-sans select-text">
      {/* 1. Persistent Application Sidebar on Desktop, Drawer on Mobile */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        persistentDesktop={true}
      />

      {/* 2. Top Bar (Mobile Drawer Header + Desktop Floating Navigation Pill) */}
      <HomeTopBarNew
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenNews={onOpenNews}
        onSearchFocus={() => {
          if (activeTab !== "search") {
            setActiveTab("search");
          }
        }}
      />

      {/* 3. Main Centered Workspace (Framed to prevent overwhelming wide layout) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-1 lg:px-4  sm:py-6 space-y-7 pb-10 lg:pb-8">
        {/* Hero Section & Live Wiki Tools (when Home tab is active) */}
        {activeTab === "home" && (
          <>
            <HomeHeroNew />

            <HomeCategoriesNew
              onOpenPortal={onOpenPortal}
              onOpenAllCategories={onOpenAllCategories}
            />
            {/* Live Wiki Tools & Highlights (Pending Reviews for Admins, News for Normal Users) */}
            <HomeStatsNew
              newPages={newPages}
              updatedPages={updatedPages}
              pendingPages={pendingPages}
              newsPages={newsPages}
              popularPages={popularPages}
              upcomingEvents={upcomingEvents}
              getRelativeTime={getRelativeTime}
              onOpenNewPages={onOpenNewPages}
              onOpenUpdatedPages={onOpenUpdatedPages}
              onOpenPendingPages={onOpenPendingPages}
              onOpenNews={onOpenNews}
              onOpenEvents={onOpenEvents}
              onRandomPage={onRandomPage}
            />
          </>
        )}

        {/* Dynamic Section: Categories OR Search / Bookmarks / Profile */}
        <div ref={categoriesRef} className="pt-1">
          { activeTab === "search" ? (
            <div className="rounded-2xl border border-base-200 bg-base-100 p-2  shadow-sm">
              {searchComponent}
            </div>
          ) : activeTab === "bookmarks" ? (
            <div className="rounded-2xl border border-base-200 bg-base-100 p-2 shadow-sm">
              {bookmarksComponent}
            </div>
          ) : activeTab === "profile" ? (
            <div className="rounded-2xl border border-base-200 bg-base-100 md:p-2   shadow-sm">
              {profileComponent}
            </div>
          ) : null}
        </div>
      </main>

      {/* Floating Bottom Navbar on Mobile/Tablet */}
      {!sidebarOpen && (
        <BottomNavbar
          tabs={mobileTabs}
          activeTab={activeTab}
          hidden={mobileNavHidden}
          mobileAction={{
            icon: Search,
            onClick: () => setActiveTab(activeTab === "search" ? "home" : "search"),
            label: "Search",
            active: activeTab === "search",
          }}
          className="fixed lg:hidden bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        />
      )}
    </div>
  );
}
