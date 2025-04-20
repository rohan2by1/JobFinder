"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  MapPin,
  Clock,
  Search,
  GraduationCap,
  Banknote,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

// Define the Job interface
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

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("position")
  const [batchFilter, setBatchFilter] = useState("batch")
  const [locationFilter, setLocationFilter] = useState("location")
  const [streamFilter, setStreamFilter] = useState("stream")

  const jobsPerPage = 10

  useEffect(() => {
    // Check if there are jobs in localStorage
    const storedJobs = localStorage.getItem("jobListings")
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs))
    } else {
      // Use default jobs data
      setJobs(defaultJobs)
    }
    setIsLoading(false)
  }, [])

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Additional filters can be implemented here
    return matchesSearch
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-muted-foreground">
          Browse thousands of job listings across various industries and locations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search job titles or keywords"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
          />
        </div>

        <Select
          value={positionFilter}
          onValueChange={(value) => {
            setPositionFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="position">Any Position</SelectItem>
            <SelectItem value="entry">Entry Level</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="mid">Mid Level</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="lead">Team Lead</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={batchFilter}
          onValueChange={(value) => {
            setBatchFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Batch (Passout Year)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="batch">Any Batch</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2020">2020</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={locationFilter}
          onValueChange={(value) => {
            setLocationFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="location">Any Location</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi NCR</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={streamFilter}
          onValueChange={(value) => {
            setStreamFilter(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Stream" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stream">Any Stream</SelectItem>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="it">Information Technology</SelectItem>
            <SelectItem value="ece">Electronics & Communication</SelectItem>
            <SelectItem value="eee">Electrical Engineering</SelectItem>
            <SelectItem value="mech">Mechanical Engineering</SelectItem>
            <SelectItem value="civil">Civil Engineering</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <div className="w-20 h-20 relative">
                          <Image
                            src={job.companyLogo || "/placeholder.svg"}
                            alt={`${job.company} logo`}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                            <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
                            {job.isRemote && <Badge variant="secondary">Remote</Badge>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm mb-4">
                          <div className="flex items-center text-muted-foreground">
                            <Briefcase className="h-4 w-4 mr-2" />
                            <span>Role: {job.category}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>Location: {job.location}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Batch: {job.batch}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <GraduationCap className="h-4 w-4 mr-2" />
                            <span>Qualification: {job.qualification}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Banknote className="h-4 w-4 mr-2" />
                            <span>Salary: {job.salary}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Posted: {job.postedDate}</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button variant="outline">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <p className="text-lg text-muted-foreground">No job listings found matching your criteria</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setPositionFilter("position")
                    setBatchFilter("batch")
                    setLocationFilter("location")
                    setStreamFilter("stream")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => paginate(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>

              <span className="text-sm text-muted-foreground ml-2">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </>
      )}
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
  {
    id: 4,
    title: "Marketing Manager",
    company: "GrowthMarketing",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Chicago, IL",
    isRemote: false,
    type: "Full-time",
    category: "Sales/Marketing",
    batch: "2018-2022",
    qualification: "MBA in Marketing",
    salary: "$85,000 - $105,000",
    postedDate: "Just now",
    description:
      "We're looking for a Marketing Manager to lead our digital marketing efforts. The ideal candidate has experience with SEO, content marketing, social media, and email campaigns. You'll be responsible for developing and executing marketing strategies to drive growth.",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataInsights",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Remote",
    isRemote: true,
    type: "Part-time",
    category: "Data Science",
    batch: "2020-2023",
    qualification: "M.Sc/M.Tech in CS/Statistics",
    salary: "$50 - $70 per hour",
    postedDate: "5 days ago",
    description:
      "DataInsights is hiring a part-time Data Scientist to analyze large datasets and build predictive models. Strong background in statistics, machine learning, and programming (Python, R) is required. Experience with data visualization tools like Tableau is a plus.",
  },
  {
    id: 6,
    title: "Full Stack Developer",
    company: "WebTech Solutions",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Seattle, WA",
    isRemote: false,
    type: "Full-time",
    category: "Software Developer",
    batch: "2019-2022",
    qualification: "B.Tech/M.Tech in CS/IT",
    salary: "$110,000 - $130,000",
    postedDate: "1 week ago",
    description:
      "WebTech Solutions is looking for a Full Stack Developer proficient in both frontend and backend technologies. Experience with React, Node.js, and database systems is required. You'll be working on developing and maintaining web applications for our clients.",
  },
  {
    id: 7,
    title: "Cyber Security Analyst",
    company: "SecureNet",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Boston, MA",
    isRemote: true,
    type: "Full-time",
    category: "Cyber Security",
    batch: "2020-2023",
    qualification: "Bachelor's in CS/IT with Security focus",
    salary: "$95,000 - $115,000",
    postedDate: "3 days ago",
    description:
      "SecureNet is seeking a Cyber Security Analyst to help protect our systems and data from threats. You'll be responsible for monitoring security systems, conducting vulnerability assessments, and responding to security incidents.",
  },
  {
    id: 8,
    title: "Android Developer",
    company: "MobileApps Inc.",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "San Diego, CA",
    isRemote: false,
    type: "Full-time",
    category: "Android",
    batch: "2021-2024",
    qualification: "B.Tech in CS/IT",
    salary: "$100,000 - $120,000",
    postedDate: "Just now",
    description:
      "MobileApps Inc. is looking for an Android Developer to join our mobile development team. Experience with Kotlin, Java, and Android SDK is required. You'll be responsible for developing and maintaining Android applications.",
  },
  {
    id: 9,
    title: "Business Analyst",
    company: "ConsultCorp",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Denver, CO",
    isRemote: true,
    type: "Contract",
    category: "Business Analyst",
    batch: "2018-2021",
    qualification: "MBA or equivalent",
    salary: "$50 - $70 per hour",
    postedDate: "4 days ago",
    description:
      "ConsultCorp is hiring a Business Analyst to help our clients optimize their business processes. Experience with requirements gathering, process mapping, and data analysis is required. You'll be working with clients to understand their needs and propose solutions.",
  },
  {
    id: 10,
    title: "QA Engineer",
    company: "QualityTech",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Portland, OR",
    isRemote: false,
    type: "Full-time",
    category: "QA",
    batch: "2020-2023",
    qualification: "Bachelor's in CS/IT or related field",
    salary: "$85,000 - $100,000",
    postedDate: "1 week ago",
    description:
      "QualityTech is looking for a QA Engineer to ensure the quality of our software products. Experience with manual and automated testing is required. You'll be responsible for developing test plans, executing tests, and reporting bugs.",
  },
  {
    id: 11,
    title: "Data Engineer",
    company: "DataFlow Systems",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Atlanta, GA",
    isRemote: true,
    type: "Full-time",
    category: "Data Engineer",
    batch: "2019-2022",
    qualification: "B.Tech/M.Tech in CS/IT",
    salary: "$110,000 - $130,000",
    postedDate: "2 days ago",
    description:
      "DataFlow Systems is seeking a Data Engineer to design and implement data pipelines. Experience with ETL processes, SQL, and big data technologies is required. You'll be responsible for building scalable data infrastructure.",
  },
  {
    id: 12,
    title: "Technical Consultant",
    company: "TechAdvise",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Miami, FL",
    isRemote: false,
    type: "Full-time",
    category: "Consultant",
    batch: "2018-2021",
    qualification: "Bachelor's in CS/IT or related field",
    salary: "$90,000 - $110,000",
    postedDate: "5 days ago",
    description:
      "TechAdvise is looking for a Technical Consultant to provide expert advice to our clients. Experience with software development and system architecture is required. You'll be working with clients to understand their technical needs and provide solutions.",
  },
]
