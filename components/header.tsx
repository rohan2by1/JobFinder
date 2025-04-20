"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            JobFinder
          </Link>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("h-6 w-6", isMenuOpen ? "hidden" : "block")}
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("h-6 w-6", isMenuOpen ? "block" : "hidden")}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>All Jobs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {jobCategories.map((category) => (
                    <li key={category}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/jobs/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {category}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/location/remote"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        Work From Home
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/location/bengaluru"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        Bengaluru
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/location/delhi-ncr"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        New Delhi/NCR
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/location/hyderabad"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        Hyderabad
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/location/chennai"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        Chennai
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/location/pune"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        Pune
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Batch</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/batch/2025"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        2025
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/batch/2024"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        2024
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/batch/2023"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        2023
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/batch/2022"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        2022
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/batch/2021"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        2021
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/jobs/batch/2020"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        2020
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "absolute top-16 left-0 right-0 bg-background border-b md:hidden",
            isMenuOpen ? "block" : "hidden",
          )}
        >
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="px-2 py-1 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <div className="px-2 py-1">
                <div className="font-medium mb-2">All Jobs</div>
                <div className="pl-4 flex flex-col space-y-2">
                  {jobCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/jobs/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="px-2 py-1">
                <div className="font-medium mb-2">Locations</div>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link
                    href="/jobs/location/remote"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Work From Home
                  </Link>
                  <Link
                    href="/jobs/location/bengaluru"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bengaluru
                  </Link>
                  <Link
                    href="/jobs/location/delhi-ncr"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New Delhi/NCR
                  </Link>
                  <Link
                    href="/jobs/location/hyderabad"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hyderabad
                  </Link>
                  <Link
                    href="/jobs/location/chennai"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chennai
                  </Link>
                  <Link
                    href="/jobs/location/pune"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pune
                  </Link>
                </div>
              </div>
              <div className="px-2 py-1">
                <div className="font-medium mb-2">Batch</div>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link
                    href="/jobs/batch/2025"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    2025
                  </Link>
                  <Link
                    href="/jobs/batch/2024"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    2024
                  </Link>
                  <Link
                    href="/jobs/batch/2023"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    2023
                  </Link>
                  <Link
                    href="/jobs/batch/2022"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    2022
                  </Link>
                  <Link
                    href="/jobs/batch/2021"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    2021
                  </Link>
                  <Link
                    href="/jobs/batch/2020"
                    className="text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    2020
                  </Link>
                </div>
              </div>
              <Link href="/about" className="px-2 py-1 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" className="px-2 py-1 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}

const jobCategories = [
  "Internships",
  "Software Developer",
  "Cyber Security",
  "Devops and Cloud",
  "Web Developer",
  "Data Analyst",
  "Consultant",
  "Data Engineer",
  "Sales/Marketing",
  "Data Science",
  "QA",
  "System Engineer",
  "Graduate Engineer Trainee",
  "Testing",
  "Android",
  "Business Analyst",
  "Non-Tech Roles",
]
