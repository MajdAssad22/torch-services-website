"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";
import { AlignJustify } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { Button } from "./ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50">
      <nav
        className={`fixed top-0 left-0 w-full z-50 duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between md:justify-start py-3 px-4 gap-5">
          {/* Logo */}
          <a href="/">
            <img
              src="/Torch Logo.png"
              alt="Torch Services Logo"
              className="h-8 w-auto md:h-10"
            />
          </a>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center justify-center w-8 h-8"
                  aria-label="Open navigation"
                >
                  <AlignJustify />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <nav className="p-4">
                  <ul className="flex flex-col gap-4">
                    <li>
                      <SheetClose asChild>
                        <a
                          href="/about"
                          className="block px-3 py-2 rounded hover:bg-muted transition-colors"
                        >
                          About
                        </a>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <a
                          href="/contact"
                          className="block px-3 py-2 rounded hover:bg-muted transition-colors"
                        >
                          Contact
                        </a>
                      </SheetClose>
                    </li>
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-end">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent p-2 cursor-pointer font-semibold hover:text-primary hover:translate-y-[-2px] transition-all">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[650px] origin-top-right !left-auto !right-0 !transform !translate-x-0">
                    <div className="flex bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                      {/* Categories Panel */}
                      <div className="w-1/3 border-r border-slate-200 bg-gray-50/50">
                        <div className="p-6">
                          <h3 className="text-xs font-semibold uppercase tracking-wider mb-6 px-1">
                            Service Categories
                          </h3>
                          <div className="space-y-1">
                            {serviceCategories.map(
                              (category, categoryIndex) => (
                                <button
                                  key={categoryIndex}
                                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium group relative overflow-hidden ${
                                    activeCategory === categoryIndex
                                      ? "bg-primary text-white shadow-md"
                                      : "hover:bg-white  hover:shadow-sm"
                                  }`}
                                  onMouseEnter={() =>
                                    setActiveCategory(categoryIndex)
                                  }
                                >
                                  <div className="relative z-10 flex items-center justify-between">
                                    <span className="leading-tight text-left break-words pr-2">
                                      {category.category}
                                    </span>
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full transition-all flex-shrink-0 ${
                                        activeCategory === categoryIndex
                                          ? "bg-white w-3.5 h-3.5"
                                          : "bg-slate-300 w-1.5 h-1.5"
                                      }`}
                                    />
                                  </div>
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Services Panel */}
                      <div className="w-2/3 p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          {serviceCategories[activeCategory].category}
                        </h3>
                        <div className="grid gap-2">
                          {serviceCategories[activeCategory].services.map(
                            (service, serviceIndex) => (
                              <NavigationMenuLink
                                key={serviceIndex}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none cursor-pointer border border-transparent transition-none hover:border-slate-200"
                                onClick={() => console.log(service.slug)}
                              >
                                <div className="text-sm font-medium">
                                  {service.title}
                                </div>
                                <div className="text-xs mt-1">
                                  Learn more about our{" "}
                                  {service.title.toLowerCase()} services
                                </div>
                              </NavigationMenuLink>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="/about"
                      className="rounded p-2 !bg-transparent font-semibold hover:text-primary hover:translate-y-[-2px] transition-all"
                    >
                      About
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="/contact"
                      className="rounded p-2 !bg-transparent font-semibold hover:text-primary hover:translate-y-[-2px] transition-all"
                    >
                      Contact
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
