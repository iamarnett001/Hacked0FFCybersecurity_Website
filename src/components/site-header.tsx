import { Menu, X } from "lucide-react";

import { Mark } from "@/components/mark";
import { nav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 text-foreground">
          <Mark className="size-7 text-primary" />
          <span className="hidden text-[11px] font-medium tracking-[0.22em] uppercase text-muted-foreground sm:block">
            Cybersecurity for family businesses
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Native disclosure so the menu works even before client JS hydrates. */}
        <details className="group relative md:hidden">
          <summary
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md text-foreground [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5 group-open:hidden" />
            <X className="hidden size-5 group-open:block" />
          </summary>
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="absolute right-0 z-50 mt-1 w-56 border border-border bg-background px-4 py-2 shadow-md"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-sm text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
