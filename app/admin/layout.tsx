"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("adminAuth")
    setIsAuthenticated(auth === "true")

    // If not authenticated and not on login page, redirect to login
    if (auth !== "true" && !isLoginPage) {
      router.push("/admin/login")
    }
  }, [router, isLoginPage])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  // If on login page or not authenticated, just render children
  if (isLoginPage || !isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-40 bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/admin/dashboard" className="font-bold text-xl">
              JobFinder Admin
            </Link>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 border-r bg-background">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/admin/dashboard">
              <Button variant={pathname === "/admin/dashboard" ? "default" : "ghost"} className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/jobs/new">
              <Button variant={pathname === "/admin/jobs/new" ? "default" : "ghost"} className="w-full justify-start">
                Add New Job
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                View Public Site
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background border-r p-6 shadow-lg">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Link href="/admin/dashboard" className="font-bold text-xl">
                    JobFinder Admin
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="sr-only">Close</span>
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
                      className="h-6 w-6"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link href="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={pathname === "/admin/dashboard" ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/admin/jobs/new" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={pathname === "/admin/jobs/new" ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      Add New Job
                    </Button>
                  </Link>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      View Public Site
                    </Button>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
