import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  MapPin,
  Clock,
  Building,
  GraduationCap,
  Banknote,
  Calendar,
  ArrowLeft,
  Share2,
  Users,
  BookOpen,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the job details based on the ID
  const jobId = Number.parseInt(params.id)
  const job = jobs.find((j) => j.id === jobId) || jobs[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-background rounded-lg border p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src={job.companyLogo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                    <p className="text-muted-foreground text-lg">{job.company}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button>Apply Now</Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm mb-6">
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

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
              {job.isRemote && <Badge variant="secondary">Remote</Badge>}
              {job.stream && <Badge variant="outline">{job.stream}</Badge>}
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <h2>Job Description</h2>
              <p>{job.description}</p>

              <h2>Responsibilities</h2>
              <ul>
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2>Requirements</h2>
              <ul>
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2>Benefits</h2>
              <ul>
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-background rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">How to Apply</h2>
            <p className="mb-6">
              Please submit your resume and a cover letter explaining why you're a good fit for this position. We'll
              review your application and get back to you within 5 business days.
            </p>
            <Button size="lg" className="w-full md:w-auto">
              Apply for this position
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{job.companyInfo.size}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{job.companyInfo.headquarters}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{job.companyInfo.industry}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Founded {job.companyInfo.founded}</span>
              </div>
              <p className="text-sm">{job.companyInfo.description}</p>
              <Button variant="outline" className="w-full">
                Visit Company Website
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
              <CardDescription>You might be interested in these roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {similarJobs.map((job, index) => (
                <Link href={`/jobs/${job.id}`} key={index} className="block">
                  <div className="border rounded-md p-4 hover:border-primary transition-colors">
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center text-sm mt-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="text-muted-foreground">{job.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "/placeholder.svg?height=96&width=96",
    location: "San Francisco, CA",
    isRemote: true,
    type: "Full-time",
    category: "Software Developer",
    batch: "2020-2023",
    qualification: "B.Tech/M.Tech in CS/IT",
    stream: "Computer Science",
    salary: "$120,000 - $150,000",
    postedDate: "2 days ago",
    description:
      "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React, Next.js, and TypeScript. The ideal candidate has 5+ years of experience with modern frontend frameworks.",
    responsibilities: [
      "Develop and maintain frontend applications using React, Next.js, and TypeScript",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and efficient code",
      "Optimize applications for maximum speed and scalability",
      "Participate in code reviews and mentor junior developers",
    ],
    requirements: [
      "5+ years of experience with frontend development",
      "Strong proficiency in JavaScript, HTML, and CSS",
      "Experience with React, Next.js, and TypeScript",
      "Understanding of responsive design principles",
      "Knowledge of frontend testing frameworks",
      "Excellent problem-solving skills and attention to detail",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Unlimited PTO policy",
      "Professional development budget",
      "401(k) matching",
    ],
    companyInfo: {
      size: "250-500 employees",
      headquarters: "San Francisco, CA",
      industry: "Software Development",
      founded: "2015",
      description:
        "TechCorp Inc. is a leading software company specializing in building innovative web applications for enterprise clients. We're committed to creating a collaborative and inclusive work environment where everyone can thrive.",
    },
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    companyLogo: "/placeholder.svg?height=96&width=96",
    location: "New York, NY",
    isRemote: false,
    type: "Full-time",
    category: "Design",
    batch: "2021-2024",
    qualification: "Bachelor's in Design/HCI",
    stream: "Design",
    salary: "$90,000 - $110,000",
    postedDate: "1 week ago",
    description:
      "DesignHub is seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. You should have a strong portfolio demonstrating your design process and experience with Figma, Sketch, and Adobe Creative Suite.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Design wireframes, prototypes, and high-fidelity mockups",
      "Collaborate with product managers and engineers to define and implement innovative solutions",
      "Conduct user research and evaluate user feedback",
      "Create user flows, journey maps, and information architecture",
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Strong portfolio showcasing your design process and solutions",
      "Proficiency in design tools such as Figma, Sketch, and Adobe Creative Suite",
      "Understanding of user-centered design principles",
      "Excellent communication and presentation skills",
      "Ability to work in a fast-paced environment",
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "Flexible work schedule",
      "Professional development opportunities",
      "Creative work environment",
      "Company events and team building activities",
    ],
    companyInfo: {
      size: "50-100 employees",
      headquarters: "New York, NY",
      industry: "Design Services",
      founded: "2018",
      description:
        "DesignHub is a creative agency that helps businesses create exceptional digital experiences. We work with clients across various industries to design and develop user-centered products that solve real problems.",
    },
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudSystems",
    companyLogo: "/placeholder.svg?height=96&width=96",
    location: "Austin, TX",
    isRemote: true,
    type: "Contract",
    category: "Devops and Cloud",
    batch: "2019-2022",
    qualification: "B.Tech in CS/IT/ECE",
    stream: "Computer Science",
    salary: "$60 - $80 per hour",
    postedDate: "3 days ago",
    description:
      "Join our DevOps team to help build and maintain our cloud infrastructure. Experience with AWS, Kubernetes, Docker, and CI/CD pipelines is required. You'll be responsible for improving our deployment processes and system reliability.",
    responsibilities: [
      "Design, implement, and maintain CI/CD pipelines",
      "Manage and optimize cloud infrastructure on AWS",
      "Implement containerization using Docker and Kubernetes",
      "Automate infrastructure provisioning using tools like Terraform",
      "Monitor system performance and troubleshoot issues",
      "Collaborate with development teams to improve deployment processes",
    ],
    requirements: [
      "3+ years of experience in DevOps or similar role",
      "Strong knowledge of AWS services",
      "Experience with containerization technologies (Docker, Kubernetes)",
      "Familiarity with infrastructure as code tools (Terraform, CloudFormation)",
      "Understanding of CI/CD principles and tools (Jenkins, GitHub Actions)",
      "Scripting skills (Bash, Python)",
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible work schedule",
      "Remote work option",
      "Professional development opportunities",
      "Collaborative team environment",
      "Potential for conversion to full-time",
    ],
    companyInfo: {
      size: "100-250 employees",
      headquarters: "Austin, TX",
      industry: "Cloud Services",
      founded: "2016",
      description:
        "CloudSystems provides cloud infrastructure solutions to help businesses scale their operations efficiently. We specialize in cloud migration, optimization, and managed services for companies of all sizes.",
    },
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "GrowthMarketing",
    companyLogo: "/placeholder.svg?height=96&width=96",
    location: "Chicago, IL",
    isRemote: false,
    type: "Full-time",
    category: "Sales/Marketing",
    batch: "2018-2022",
    qualification: "MBA in Marketing",
    stream: "Business",
    salary: "$85,000 - $105,000",
    postedDate: "Just now",
    description:
      "We're looking for a Marketing Manager to lead our digital marketing efforts. The ideal candidate has experience with SEO, content marketing, social media, and email campaigns. You'll be responsible for developing and executing marketing strategies to drive growth.",
    responsibilities: [
      "Develop and implement comprehensive marketing strategies",
      "Manage digital marketing campaigns across various channels",
      "Create and optimize content for SEO and lead generation",
      "Analyze campaign performance and provide actionable insights",
      "Collaborate with sales team to align marketing efforts with sales goals",
      "Manage marketing budget and track ROI",
    ],
    requirements: [
      "4+ years of experience in digital marketing",
      "Strong understanding of SEO, content marketing, and social media",
      "Experience with marketing automation tools and CRM systems",
      "Analytical skills with ability to use data to inform decisions",
      "Excellent communication and project management skills",
      "Bachelor's degree in Marketing or related field",
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Paid time off and holidays",
      "Professional development budget",
      "Modern office in downtown Chicago",
    ],
    companyInfo: {
      size: "25-50 employees",
      headquarters: "Chicago, IL",
      industry: "Marketing Services",
      founded: "2019",
      description:
        "GrowthMarketing is a digital marketing agency that helps businesses increase their online presence and drive growth. We specialize in SEO, content marketing, social media, and paid advertising campaigns.",
    },
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataInsights",
    companyLogo: "/placeholder.svg?height=96&width=96",
    location: "Remote",
    isRemote: true,
    type: "Part-time",
    category: "Data Science",
    batch: "2020-2023",
    qualification: "M.Sc/M.Tech in CS/Statistics",
    stream: "Data Science",
    salary: "$50 - $70 per hour",
    postedDate: "5 days ago",
    description:
      "DataInsights is hiring a part-time Data Scientist to analyze large datasets and build predictive models. Strong background in statistics, machine learning, and programming (Python, R) is required. Experience with data visualization tools like Tableau is a plus.",
    responsibilities: [
      "Analyze large datasets to identify trends and insights",
      "Develop and implement machine learning models",
      "Create data visualizations to communicate findings",
      "Collaborate with cross-functional teams to solve business problems",
      "Optimize data collection procedures",
      "Stay up-to-date with the latest data science techniques",
    ],
    requirements: [
      "Master's degree or PhD in Statistics, Computer Science, or related field",
      "Strong programming skills in Python or R",
      "Experience with machine learning algorithms and statistical modeling",
      "Knowledge of data visualization tools (Tableau, Power BI)",
      "Excellent problem-solving and analytical skills",
      "Ability to communicate complex findings to non-technical stakeholders",
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible work schedule",
      "Remote work",
      "Access to learning resources and conferences",
      "Collaborative team environment",
      "Opportunity to work on diverse projects",
    ],
    companyInfo: {
      size: "10-25 employees",
      headquarters: "Boston, MA",
      industry: "Data Analytics",
      founded: "2020",
      description:
        "DataInsights helps businesses make data-driven decisions through advanced analytics and machine learning. We work with clients across various industries to extract meaningful insights from their data.",
    },
  },
]

const similarJobs = [
  {
    id: 2,
    title: "Frontend Developer",
    company: "WebTech Solutions",
    location: "Remote",
  },
  {
    id: 3,
    title: "React Developer",
    company: "AppWorks",
    location: "San Francisco, CA",
  },
  {
    id: 4,
    title: "Full Stack Engineer",
    company: "CodeCraft",
    location: "Seattle, WA",
  },
]
