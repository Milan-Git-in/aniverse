"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Home,
  MessageCircle,
  Trophy,
  BarChart3,
  Bell,
  BookOpen,
  CloudLightning,
} from "lucide-react";

const items = [
  { title: "Home", href: "/", icon: Home },
  { title: "Chat", href: "/chat", icon: MessageCircle },
  { title: "Populars", href: "/leaderboards", icon: Trophy },
  { title: "Ranking", href: "/ranking", icon: BarChart3 },
  { title: "Updates", href: "/updates", icon: Bell },
  { title: "Manhwas", href: "/Manhwas", icon: BookOpen },
  { title: "Lightnovels", href: "/lightnovels", icon: CloudLightning },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-[4rem]  h-[calc(100vh-3.5rem)] w-20 bg-transparent backdrop-blur-sm border-r-2 border-primary">
      <nav className="flex flex-col items-center gap-2 py-4">
        {items.map(({ title, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={title}
              href={href}
              className={clsx(
                "group flex flex-col items-center gap-1 rounded-lg px-2 py-3 transition-all duration-400 w-[80%] ",
                "hover:bg-muted hover:scale-105 hover:text-black",
                isActive && "bg-muted scale-105 text-black",
              )}
            >
              <Icon
                className={clsx(
                  "h-5 w-5 transition-all",
                  isActive && "stroke-[2.5]",
                )}
              />
              <span
                className={clsx(
                  "text-[11px] transition-all",
                  isActive ? "font-semibold" : "opacity-70",
                )}
              >
                {title}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
