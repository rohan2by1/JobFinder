import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Info Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs/location/remote"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Work From Home
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/location/bengaluru"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Bengaluru
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/location/delhi-ncr"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  New Delhi/NCR
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/location/hyderabad"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hyderabad
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/location/chennai"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Chennai
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/location/pune"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pune
                </Link>
              </li>
            </ul>
          </div>

          {/* All Jobs Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">All Jobs</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs/category/internships"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Internships
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/category/software-engineer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Software Engineer
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/category/data-analyst"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Data Analyst
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/category/web-development"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/category/cyber-security"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cyber Security
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs/category/sales-marketing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sales & Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for daily job updates, helpful tips.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Your email" className="pl-10" />
              </div>
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
