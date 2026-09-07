"use client";

import { DesktopNavbar } from "@/components/layout/desktop-navbar";
import { MobileNavbar } from "@/components/layout/mobile-nav";
import { NavbarScrim } from "@/components/layout/navbar-scrim";

export function Navbar() {
  return (
    <>
      <NavbarScrim />

      <header className="sticky top-0 z-50 w-full">
        <div className="container-site py-2.5 sm:py-3">
          <div className="hidden w-full lg:block">
            <DesktopNavbar />
          </div>

          <div className="w-full lg:hidden">
            <MobileNavbar />
          </div>
        </div>
      </header>
    </>
  );
}
