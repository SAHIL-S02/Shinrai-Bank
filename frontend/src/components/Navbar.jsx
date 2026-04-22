"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "",
    },
    {
      name: "Dashboard",
      link: "dashboard",
    },
    {
      name: "Contact",
      link: "contact",
    },
    {
      name: "About Us",
      link: "about-us",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-[#101212]">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="relative z-20 flex items-center gap-4">
            <NavLink to="/login"><NavbarButton as="button" variant="secondary">Login</NavbarButton></NavLink>
            
            <NavLink to="/create-account"><NavbarButton as="button" variant="primary">Create Account</NavbarButton></NavLink>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <NavLink
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </NavLink>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <NavbarButton
                  as="button"
                  variant="primary"
                  className="w-full">
                  Login
                </NavbarButton>
              </NavLink>
              <NavLink to="/create-account" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                <NavbarButton
                  as="button"
                  variant="primary"
                  className="w-full">
                  Create Account
                </NavbarButton>
              </NavLink>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}

