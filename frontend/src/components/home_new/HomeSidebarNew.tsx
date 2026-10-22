"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  Search,
  Bookmark,
  User,
  ChevronRight,
  ExternalLink,
  Users2,
  BookOpen,
  Landmark,
  Calendar,
  GraduationCap,
  FileText,
  Briefcase,
  TrendingUp,
  MapPin,
  Info,
  HelpCircle,
  X,
} from "lucide-react";

interface HomeSidebarNewProps {
  activeTab: "home" | "search" | "bookmarks" | "profile";
  setActiveTab: (tab: "home" | "search" | "bookmarks" | "profile") => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenPortal?: (slug: string) => void;
}

export default function HomeSidebarNew({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  onOpenPortal,
}: HomeSidebarNewProps) {
  const exploreItems = [
    { label: "Councils & Clubs", icon: Users2, slug: "clubs", href: "/wiki/clubs" },
    { label: "Courses", icon: BookOpen, slug: "courses", href: "/wiki/courses" },
    { label: "Departments", icon: Landmark, slug: "departments", href: "/wiki/departments" },
    { label: "Fests & Events", icon: Calendar, slug: "fests", href: "/wiki/fests" },
    { label: "Student Life", icon: GraduationCap, slug: "student-life", href: "/wiki/student-life" },
    { label: "Campus Resources", icon: FileText, slug: "resources", href: "/wiki/resources" },
    { label: "Off-Campus", icon: Briefcase, slug: "off-campus", href: "/wiki/off-campus" },
  ];

  const quickLinks = [
    { label: "PrepMat", icon: TrendingUp, href: "/prepmat", isNew: true },
    { label: "Campus Map", icon: MapPin, href: "/wiki/campus-map" },
    { label: "Academic Info", icon: Info, href: "/wiki/academics" },
    { label: "Contact & Help", icon: HelpCircle, href: "/wiki/contact" },
  ];

  const navClass = (isActive: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-primary/10 text-primary shadow-xs"
        : "text-base-content/70 hover:bg-base-200/80 hover:text-base-content"
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 lg:w-60 xl:w-64 shrink-0 bg-base-100 border-r border-base-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto p-4 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pt-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform font-serif">
                mI
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-base-content leading-tight">
                  META IITGN
                </span>
                <span className="text-[10px] font-medium text-base-content/50 leading-tight">
                  Campus Wiki
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-base-content/60 hover:bg-base-200 transition-colors"
              title="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Nav Links */}
          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveTab("home");
                onClose();
              }}
              className={`w-full ${navClass(activeTab === "home")}`}
            >
              <Home className={`w-4 h-4 ${activeTab === "home" ? "fill-primary" : ""}`} />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("search");
                onClose();
              }}
              className={`w-full ${navClass(activeTab === "search")}`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("bookmarks");
                onClose();
              }}
              className={`w-full ${navClass(activeTab === "bookmarks")}`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                onClose();
              }}
              className={`w-full ${navClass(activeTab === "profile")}`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </nav>

          {/* EXPLORE Section */}
          <div className="space-y-2 pt-2 border-t border-base-200">
            <span className="px-3 text-[10px] font-bold tracking-wider text-base-content/40 uppercase block">
              EXPLORE
            </span>
            <div className="space-y-0.5">
              {exploreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      if (onOpenPortal) onOpenPortal(item.slug);
                      onClose();
                    }}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-base-content/75 hover:bg-base-200/70 hover:text-base-content transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 text-base-content/50 group-hover:text-primary transition-colors shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-base-content/30 group-hover:text-base-content/70 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-2 pt-2 border-t border-base-200">
            <span className="px-3 text-[10px] font-bold tracking-wider text-base-content/40 uppercase block">
              Quick Links
            </span>
            <div className="space-y-0.5">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-base-content/75 hover:bg-base-200/70 hover:text-base-content transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 text-base-content/50 group-hover:text-primary transition-colors shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.isNew && (
                        <span className="badge badge-success badge-xs font-bold text-[9px] py-0.5 px-1.5 text-success-content">
                          New
                        </span>
                      )}
                    </div>
                    <ExternalLink className="w-3 h-3 text-base-content/30 group-hover:text-base-content/70 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-base-200 text-center text-[10px] text-base-content/40">
          IIT Gandhinagar Community Wiki
        </div>
      </aside>
    </>
  );
}
