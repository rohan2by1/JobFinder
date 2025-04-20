"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Import the job data type
interface Job {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  isRemote: boolean
  type: string
  category: string
  batch: string
  qualification: string
  stream?: string
  salary: string
  postedDate: string
  description: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use localStorage or default data
    const storedJobs = localStorage.getItem("jobListings")
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs))
    } else {
      // Use default jobs data
      setJobs(defaultJobs)
    }
    setIsLoading(false)
  }, [])

  const handleDeleteJob = (id: number) => {
    if (confirm("Are you sure you want to delete this job listing?")) {
      const updatedJobs = jobs.filter((job) => job.id !== id)
      setJobs(updatedJobs)
      localStorage.setItem("jobListings", JSON.stringify(updatedJobs))
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Link href="/admin/jobs/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add New Job</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{jobs.length}</CardTitle>
            <CardDescription>Total Job Listings</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{jobs.filter((job) => job.isRemote).length}</CardTitle>
            <CardDescription>Remote Jobs</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{jobs.filter((job) => job.type === "Full-time").length}</CardTitle>
            <CardDescription>Full-time Positions</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Batch</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No job listings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-muted-foreground md:hidden">{job.company}</div>
                    </TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {job.location}
                      {job.isRemote && (
                        <Badge variant="secondary" className="ml-2">
                          Remote
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{job.batch}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/jobs/${job.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteJob(job.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Default jobs data
const defaultJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "San Francisco, CA",
    isRemote: true,
    type: "Full-time",
    category: "Software Developer",
    batch: "2020-2023",
    qualification: "B.Tech/M.Tech in CS/IT",
    salary: "$120,000 - $150,000",
    postedDate: "2 days ago",
    description:
      "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React, Next.js, and TypeScript. The ideal candidate has 5+ years of experience with modern frontend frameworks.",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "New York, NY",
    isRemote: false,
    type: "Full-time",
    category: "Design",
    batch: "2021-2024",
    qualification: "Bachelor's in Design/HCI",
    salary: "$90,000 - $110,000",
    postedDate: "1 week ago",
    description:
      "DesignHub is seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. You should have a strong portfolio demonstrating your design process and experience with Figma, Sketch, and Adobe Creative Suite.",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudSystems",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Austin, TX",
    isRemote: true,
    type: "Contract",
    category: "Devops and Cloud",
    batch: "2019-2022",
    qualification: "B.Tech in CS/IT/ECE",
    salary: "$60 - $80 per hour",
    postedDate: "3 days ago",
    description:
      "Join our DevOps team to help build and maintain our cloud infrastructure. Experience with AWS, Kubernetes, Docker, and CI/CD pipelines is required. You'll be responsible for improving our deployment processes and system reliability.",
  },
]
